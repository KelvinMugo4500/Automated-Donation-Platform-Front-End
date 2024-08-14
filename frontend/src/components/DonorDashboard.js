import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import { Link } from "react-router-dom";
import CharityCard from "./CharityCard";

const DonorDashboard = ({ user, setUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [charities, setCharities] = useState([]);
  const donations = user.donations;

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get("/charities");
        setCharities(response.data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    if (user) {
      fetchCharities();
    }
  }, [user]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul className="listContainer">
          <h2>User Options</h2>
          <input
            className="search-bar"
            type="text"
            placeholder="Search for a charity..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <li className="listElements">Explore</li>
          <li className="listElements">My Donation History</li>
          <li className="listElements">Pending Requests</li>
          <li className="listElements">Beneficiary Story</li>
          <li className="listElements">Join the welfare</li>
          <li className="listElements">Invite a friend</li>
          <li className="listElements">Settings</li>
          <li className="listElements">Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, {user.username}!</h1>

        <div className="renderedContent">
          {charities.length === 0 && <div>Loading...</div>}
          {charities
            .filter((charity) =>
              charity.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((charity) => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
