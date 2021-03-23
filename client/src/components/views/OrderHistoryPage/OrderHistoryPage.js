import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import './OrderHistoryPage.css';

function OrderHistoryPage(props) {
  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Order History</h1>
      </div>
      {props.user.userData && props.user.userData.history.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty description="No Order History Available" />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date of Purchase</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {props.user.userData &&
              props.user.userData.history.map((item, index) => (
                <tr key={index}>
                  <td data-label="Product Title">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </td>
                  <td data-label="Price">{item.price}</td>
                  <td data-label="Quantity">{item.quantity}</td>
                  <td data-label="Date of Purchase">
                    {new Intl.DateTimeFormat('en-US').format(
                      new Date(item.dateOfPurchase)
                    )}
                  </td>
                  <td data-label="Payment ID">{item.paymentId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistoryPage;
