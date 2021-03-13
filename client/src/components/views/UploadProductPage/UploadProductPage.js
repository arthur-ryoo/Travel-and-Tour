import React, { useReducer } from 'react';
import FileUpload from '../../utils/FileUpload';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';

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

function UploadProductPage(props) {
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
      userId: props.user.userData._id,
      title,
      price,
      description,
      continent,
      image,
    };
    console.log(body);

    axios.post('/api/products/new', body).then((response) => {
      if (response.data.success) {
        alert('Successfuly submitted!');
        props.history.push('/');
      } else {
        alert('Failed to submit!');
      }
    });
  };

  const { title, price, description, continent, image } = userInput;
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Product</Title>
        <FileUpload handleImage={handleImage} />
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
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
