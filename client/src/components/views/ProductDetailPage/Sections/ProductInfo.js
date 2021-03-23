import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Descriptions, notification, Popover } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
import { useSelector } from 'react-redux';
import './ProductInfo.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductInfo(props) {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!props.user.isAuth) {
      history.push('/login');
    } else {
      dispatch(addToCart(props.product._id));
      openNotification();
    }
  };

  const openNotification = () => {
    const args = {
      message: 'Successfully added to your cart',
      duration: 1.5,
      icon: <CheckCircleTwoTone />,
    };
    notification.open(args);
  };

  const handleDelete = () => {
    axios.delete(`/api/products/${props.product._id}`).then((response) => {
      if (response.data.success) {
        alert('Successfully deleted!');
        history.push('/');
      } else {
        alert('Failed to delete!');
      }
    });
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <div>
      <Descriptions title="Product Info" bordered>
        <Descriptions.Item label="Price">
          {props.product.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">
          {props.product.views}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.product.description}
        </Descriptions.Item>
      </Descriptions>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
      >
        <Button size="large" type="primary" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
      {user.userData && user.userData.isAdmin ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <div style={{ margin: '0rem 0.5rem' }}>
            <Link to={`/product/${props.product._id}/edit`}>
              <Button size="large" type="primary">
                Edit
              </Button>
            </Link>
          </div>
          <div style={{ margin: '0rem 0.5rem' }}>
            <Popover
              content={
                <Button size="medium" type="danger" onClick={handleDelete}>
                  Delete
                </Button>
              }
              title="Are you sure to delete?"
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Button size="large" type="danger">
                Delete
              </Button>
            </Popover>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProductInfo;
