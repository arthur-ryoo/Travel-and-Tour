import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './hoc/auth';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import ProductDetailPage from './components/views/ProductDetailPage/ProductDetailPage';
import ProductEditPage from './components/views/ProductEditPage/ProductEditPage';
import CartPage from './components/views/CartPage/CartPage';
import OrderHistoryPage from './components/views/OrderHistoryPage/OrderHistoryPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false, null)} />
          <Route
            exact
            path="/register"
            component={Auth(RegisterPage, false, null)}
          />
          <Route
            exact
            path="/product/upload"
            component={Auth(UploadProductPage, true, true)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(ProductDetailPage, null, null)}
          />
          <Route
            exact
            path="/user/cart"
            component={Auth(CartPage, true, null)}
          />
          <Route
            exact
            path="/account/orders"
            component={Auth(OrderHistoryPage, true, null)}
          />
          <Route
            exact
            path="/product/:productId/edit"
            component={Auth(ProductEditPage, true, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
