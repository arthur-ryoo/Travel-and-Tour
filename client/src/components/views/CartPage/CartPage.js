import { Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [dispatch, props.user.userData]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <UserCardBlock
        product={props.user.cartDetail}
        removeItem={removeFromCart}
      />

      {showTotal ? (
        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount: ${total}</h2>
        </div>
      ) : (
        <div style={{ marginTop: '3rem' }}>
          <Empty description="No Items Available" />
        </div>
      )}
    </div>
  );
}

export default CartPage;
