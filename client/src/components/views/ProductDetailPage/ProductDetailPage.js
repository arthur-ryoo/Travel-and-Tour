import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';
import './ProductDetailPage.css';

function ProductDetailPage(props) {
  const [product, setProduct] = useState({});
  const productId = props.match.params.productId;
  useEffect(() => {
    axios
      .get(`/api/products/${productId}?type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));

    axios.get(`/api/products/${productId}/view`);
  }, [productId]);

  return (
    <div className="container">
      <div className="sub_container">
        <h1>{product.title}</h1>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage image={product.image} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo product={product} user={props.user.userData} />
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailPage;
