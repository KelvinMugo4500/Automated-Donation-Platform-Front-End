// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className='navbar'>
    <div className='navbar-container'>
      <Link to='/' className='navbar-logo'>
        Automated Donation Platform
      </Link>
      <ul className='navbar-menu'>
        <li className='navbar-item'>
          <Link to='/' className='navbar-link'>Home</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/login' className='navbar-link'>Login</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/register' className='navbar-link'>Register</Link>
        </li>
        <li className='navbar-item'>
          <Link to='/charity-list' className='navbar-link'>Charity List</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
