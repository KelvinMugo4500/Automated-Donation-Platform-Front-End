import React, { useEffect, useState } from "react";
import "./CharityList.css";

const CharityList = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetch("/charities")
      .then(response => response.json())
      .then(data => {
        const approvedCharities = data.filter(charity => charity.status === "approved");
        setCharities(approvedCharities);
      })
      .catch(error => console.error("Error fetching charities:", error));
  }, []);

  return (
    <div className="charity-list">
      <h2>Approved Charities</h2>
      <div className="charity-cards">
        {charities.map((charity) => (
          <div key={charity.id} className="charity-card">
            <img src={charity.image} alt={`${charity.name}`} className="charity-image" />
            <h3 className="charity-name">{charity.name}</h3>
            <p className="charity-description">{charity.description}</p>
            <p className="charity-impact"><strong>Impact:</strong> {charity.impact}</p>
            <p className="charity-goals"><strong>Goals:</strong> {charity.goals}</p>
            <p className="charity-mission"><strong>Mission Statement:</strong> {charity.mission_statement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityList;
