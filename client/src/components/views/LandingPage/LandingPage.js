import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    axios.get(`/api/products/list?page=${pageNumber}`).then((response) => {
      if (response.data.success) {
        setProduct(response.data.productInfo);
        setNumberOfPages(response.data.totalPages);
      } else {
        alert('Failed to load products');
      }
    });
  }, [pageNumber, numberOfPages]);

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const renderCards = product.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.image} />}>
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's travel!</h2>
      </div>
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem 0rem',
        }}
      >
        <Button onClick={goToPrevious}>Previous</Button>
        {pages.map((pageIndex, index) => (
          <Button key={index} onClick={() => setPageNumber(pageIndex)}>
            {pageIndex + 1}
          </Button>
        ))}
        <Button onClick={goToNext}>Next</Button>
      </div>
    </div>
  );
}

export default LandingPage;
