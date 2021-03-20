import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (props.image && props.image.length > 0) {
      let images = [];
      props.image.forEach((item) =>
        images.push({
          original: item,
          thumbnail: item,
        })
      );
      setImage(images);
    }
  }, [props.image]);

  return (
    <div>
      <ImageGallery items={image} />
    </div>
  );
}

export default ProductImage;
