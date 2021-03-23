import React, { useEffect, useReducer } from 'react';
import FileUpload from '../../../utils/FileUpload';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  {
    key: 1,
    value: 'Africa',
  },
  {
    key: 2,
    value: 'Europe',
  },
  {
    key: 3,
    value: 'Asia',
  },
  {
    key: 4,
    value: 'North America',
  },
  {
    key: 5,
    value: 'South America',
  },
  {
    key: 6,
    value: 'Australia',
  },
  {
    key: 7,
    value: 'Antarctica',
  },
];

function ProductEditForm(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.product) {
      setUserInput({
        title: props.product.title,
        description: props.product.description,
        price: props.product.price,
        continent: props.product.continent,
        image: props.product.image,
      });
    }
  }, [props]);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: '',
      description: '',
      price: 0,
      continent: 1,
      image: [],
    }
  );

  const handleChange = (event) => {
    setUserInput({ [event.target.name]: event.target.value });
  };

  const handleImage = (newImages) => {
    setUserInput({ image: newImages });
  };

  const handleSubmit = () => {
    if (!title || !price || !description || !continent || !image === 0) {
      return alert('Complete the form!');
    }

    const body = {
      title,
      price,
      description,
      continent,
      image,
    };

    axios.patch(`/api/products/${props.productId}`, body).then((response) => {
      if (response.data.success) {
        alert('Successfully updated!');
        history.push(`/product/${props.productId}`);
      } else {
        alert('Failed to submit!');
      }
    });
  };

  const { title, price, description, continent, image } = userInput;

  return (
    <div style={{ width: '80%', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Update Product</Title>
        <FileUpload handleImage={handleImage} image={image} />
      </div>
      <Form onFinish={handleSubmit}>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChange} type="text" name="title" value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={handleChange}
          type="text"
          name="description"
          value={description}
        />
        <br />
        <br />
        <label>Price</label>
        <Input
          onChange={handleChange}
          type="number"
          name="price"
          value={price}
        />
        <br />
        <br />
        <select onChange={handleChange} value={continent} name="continent">
          {Continents.map((c) => (
            <option key={c.key} value={c.key}>
              {c.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default ProductEditForm;
