import React from 'react';
import axios from 'axios';

function LandingPage(props) {
  const onClick = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('Failed to log out');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h2>Landing Page</h2>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default LandingPage;
