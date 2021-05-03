import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessPayment,
} from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import PayPal from '../../utils/PayPal';
import './CartPage.css';

function CartPage(props) {
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleTransaction = (data) => {
    dispatch(
      onSuccessPayment({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

  return (
    <div className="container">
      <h1>My Cart</h1>
      <UserCardBlock
        product={props.user.cartDetail}
        removeItem={removeFromCart}
      />

      {showTotal ? (
        <div className="sub_container">
          <div className="total_amount">
            <h2>Total Amount: ${total}</h2>
          </div>
          <PayPal total={total} onSuccess={handleTransaction} />
        </div>
      ) : showSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <div className="no_items">
          <Empty description="No Items Available" />
        </div>
      )}
    </div>
  );
}

export default CartPage;
