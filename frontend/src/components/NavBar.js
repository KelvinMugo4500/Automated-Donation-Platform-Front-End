import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          Automated Donation Platform
        </Link>
        <ul className='navbar-menu'>
          
          <li className='navbar-item'>
            <Link to='/our-team' className='navbar-link'>About</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/beneficiaries' className='navbar-link'>Beneficiaries</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/charities' className='navbar-link'>Charities</Link>
          </li>
          <div className='navbar-right'>
            <li className='navbar-item'>
              <Link to='/login' className='navbar-link'>Login</Link>
            </li>
            <li className='navbar-item'>
              <Link to='/register' className='navbar-link'>Register</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
