import React from 'react';
import './CharityCard.css';

const CharityCard = ({ charity }) => (
  <div className='charity-card'>
    <img src={charity.image} alt={charity.name} />
    <h3>{charity.name}</h3>
    <p>{charity.description}</p>
  </div>
);

export default CharityCard;
