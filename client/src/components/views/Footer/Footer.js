import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <footer>
        <p>Travel and Tour &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Footer;
