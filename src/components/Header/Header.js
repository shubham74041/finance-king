import React from 'react';
import './Header.css';
import logo from '../icons/rajlogo.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="navbar-logo">
        <img src={logo} alt="Logo" />
      </span>
    </div>
  );
};

export default Navbar;
