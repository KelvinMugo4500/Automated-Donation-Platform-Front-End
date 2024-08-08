import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CharityList.css";

const CharityList = () => {
  const [charities, setCharities] = useState([]);
  const [error, setError] = useState(null); // Added for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/charities");
        setCharities(response.data);
      } catch (error) {
        setError("Error fetching charities.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>; // Display error if it occurs
  }

  return (
    <div className="charity-list">
      <h1>Available Charities</h1>
      <ul>
        {charities.length > 0 ? (
          charities.map((charity) => (
            <li key={charity.id}>
              <h2>{charity.name}</h2>
              <img src={charity.image} alt={charity.name} />
              <p>{charity.description}</p>
            </li>
          ))
        ) : (
          <p>No charities available.</p>
        )}
      </ul>
    </div>
  );
};

export default CharityList;
