// src/components/CharityList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharityList.css';

const CharityList = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get('/api/charities');
        setCharities(response.data);
      } catch (error) {
        console.error('Failed to fetch charities', error);
      }
    };

    fetchCharities();
  }, []);

  return (
    <div className='charity-list'>
      <h1>Available Charities</h1>
      <ul>
        {charities.map((charity) => (
          <li key={charity.id}>
            <h2>{charity.name}</h2>
            <p>{charity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharityList;
