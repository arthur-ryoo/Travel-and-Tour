import React from 'react';
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';

function ProductInfo(props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(props.product._id));
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
        <Button size="large" shape="round" type="danger" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
