import React from 'react';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <footer>
        <p>Travel and Tour &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Footer;
