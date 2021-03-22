import React, { useState, useEffect } from 'react';
import ProductEditForm from './Sections/ProductEditForm';
import axios from 'axios';

function ProductEditPage(props) {
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
    <div>
      <ProductEditForm product={product} productId={productId} />
    </div>
  );
}

export default ProductEditPage;
