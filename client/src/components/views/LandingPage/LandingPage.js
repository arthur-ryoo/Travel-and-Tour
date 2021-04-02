import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Card, Row, Button, Empty } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchBar from './Sections/SearchBar';
import { continents } from './Sections/Data';

function LandingPage() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [limit] = useState(8);
  const [filters, setFilters] = useState({
    continent: [],
    price: [],
  });
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    axios
      .get(
        `/api/products?page=${pageNumber}&limit=${limit}&sort=${sortBy}&search=${search}`,
        {
          params: { filters },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.products);
          setNumberOfPages(response.data.totalPages);
        } else {
          alert('Failed to load products');
        }
      });
  }, [pageNumber, numberOfPages, filters, limit, sortBy, search]);

  const goToPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  const renderCards = product.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <Link to={`/product/${product._id}`}>
              <ImageSlider images={product.image} />
            </Link>
          }
        >
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  const handleFilters = (checkedValues, category) => {
    const newFilters = { ...filters };
    newFilters[category] = checkedValues;
    setFilters(newFilters);
  };

  const handleSortBy = (newValue) => {
    setSortBy(newValue);
  };

  const handleSearchKeyword = (newValue) => {
    setSearch(newValue);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto',
        }}
      >
        <SearchBar value={search} onChange={handleSearchKeyword} />
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(checkedValues) =>
              handleFilters(checkedValues, 'continent')
            }
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox onChange={handleSortBy} />
        </Col>
      </Row>

      {product.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty description="No Products Available" />
        </div>
      ) : (
        <div style={{ marginTop: '36px' }}>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem 0rem',
        }}
      >
        <Button onClick={goToPrevious}>Previous</Button>
        {pages.map((pageIndex, index) => (
          <Button key={index} onClick={() => setPageNumber(pageIndex + 1)}>
            {pageIndex + 1}
          </Button>
        ))}
        <Button onClick={goToNext}>Next</Button>
      </div>
    </div>
  );
}

export default LandingPage;
