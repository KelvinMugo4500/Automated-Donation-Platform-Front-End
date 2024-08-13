import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import CharityCard from "./CharityCard";

const DonorDashboard = ({ user, setUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [charities, setCharities] = useState([]);
  const [totals, setTotals] = useState("");
  const donations = user.donations;

  //fetch all charities to facilitate search

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get("/charities"); // use your actual API endpoint
        setCharities(response.data);
        console.log("Fetched Charities:", charities);
        // Handle the fetched charities data as needed
      } catch (error) {
        console.log(user.id);
        console.error("Error fetching charities:", error);
      }
    };

    if (user) {
      fetchCharities();
    }
  }, [user]);

  const makeDonation = () => {
    // Logic to handle donation process, can trigger modal or redirect to donation page
    console.log("Make a donation");
    console.log(user.id);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Logic to handle search implementation
    console.log("Search for:", event.target.value);
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
          {charities.map((charity) => (
            <CharityCard charity={charity} />
          ))}
          {!charities && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
