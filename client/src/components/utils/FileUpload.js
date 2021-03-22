import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (props.image) {
      setImage(props.image);
    }
  }, [props]);

  const handleDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    axios.post('/api/products/images', formData, config).then((response) => {
      if (response.status === 200) {
        setImage([...image, response.data.imageUrl]);
        props.handleImage([...image, response.data.imageUrl]);
      } else {
        alert('Failed to save the image');
      }
    });
  };

  const handleDelete = (selectedImage) => {
    const selectedImageIndex = image.indexOf(selectedImage);
    let newImages = [...image];
    newImages.splice(selectedImageIndex, 1);
    setImage(newImages);
    props.handleImage(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '260px',
          overflowX: 'auto',
        }}
      >
        {image.map((i, index) => (
          <div onClick={() => handleDelete(image)} key={index}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={i}
              alt="country"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
