// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor'); // default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password, role });
      if (response.data.success) {
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className='register-page'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='role'>Role:</label>
          <select id='role' value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='donor'>Donor</option>
            <option value='charity'>Charity</option>
            <option value='administrator'>Administrator</option>
          </select>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
