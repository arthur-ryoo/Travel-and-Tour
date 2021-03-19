import { Button } from 'antd';
import React from 'react';
import './UserCardBlock.css';

function UserCardBlock(props) {
  const renderCartImage = (image) => {
    if (image.length > 0) {
      let productImage = image[0];
      return productImage;
    }
  };

  const renderItems = () =>
    props.product &&
    props.product.map((product, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: '70px' }}
            alt="product"
            src={renderCartImage(product.image)}
          />
        </td>
        <td>{product.quantity} EA</td>
        <td>${product.price}</td>
        <td>
          <Button onClick={() => props.removeItem(product._id)}>Remove</Button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
