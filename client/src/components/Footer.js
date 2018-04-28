import React from 'react';

const Footer = (props) => (
  <footer className="footer">
    <div className="info-wrapper">
      <span className="copyright">
        <small>&copy; 2018, JZ</small>
      </span>
      <span className="github">
        <a
          href="https://github.com/ek0ms/react-weather-app"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-github" />
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
