// src/components/CharityList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CharityList.css";

const CharityList = () => {
  //fetch the approved charities
  const [charities, setCharities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://automated-donation-platform-backend-2.onrender.com/charities"
      );
      setCharities(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="charity-list">
      <h1>Available Charities</h1>
      <ul>
        {charities.map((charity) => (
          <li key={charity.id}>
            <h2>{charity.name}</h2>
            <img src={charity.image} alt={charity.name} />
            <p>{charity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharityList;
