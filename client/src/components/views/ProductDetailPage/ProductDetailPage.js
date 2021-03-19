import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';

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
  }, [productId]);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{product.title}</h1>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage image={product.image} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo product={product} />
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailPage;
