/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && user.userData.isAuth && !user.userData.isAdmin) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="order_history">
          <a href="/account/orders">Order History</a>
        </Menu.Item>
        <Menu.Item
          key="cart"
          className="cart__container"
          style={{ paddingTop: 8 }}
        >
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
              <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else if (user.userData && user.userData.isAuth && user.userData.isAdmin) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="order_history">
          <a href="/account/orders">Order History</a>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item
          key="cart"
          className="cart__container"
          style={{ paddingTop: 8 }}
        >
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
              <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
