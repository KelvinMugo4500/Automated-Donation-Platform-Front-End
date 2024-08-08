import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CharityDashboard.css";

const CharityDashboard = ({ user }) => {
  const [charities, setCharities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching charity details for user ID:", user.id);
    fetch(`/charities/${user.id}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Charity details fetched:", data);
        setCharities(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching charity details:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [user.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!charities || charities.length === 0) {
    return <div>No charity details available.</div>;
  }

  return (
    <div className="charity-dashboard">
      <h2>Charity Dashboard</h2>
      {charities.map((charity) => (
        <div key={charity.id} className="charity-details">
          <h3>{charity.name}</h3>
          <p>{charity.description}</p>
          <p>Goals: {charity.goals}</p>
          <p>Impact: {charity.impact}</p>
          <p>Mission Statement: {charity.mission_statement}</p>
        </div>
      ))}
      <Link to="/create_story" className="create-story-link">
        Create Story
      </Link>
    </div>
  );
};

export default CharityDashboard;
