import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import CharityCard from "./CharityCard";

const DonorDashboard = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [charities, setCharities] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeSection, setActiveSection] = useState("explore");

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get("/charities");
        setCharities(response.data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    fetchCharities();
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user || !user.id) return; // Ensure user ID is available
      try {
        const response = await axios.get(`/donations/${user.id}`);
        console.log("Donations fetched:", response.data); // Debug log
        if (Array.isArray(response.data)) {
          setDonations(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setDonations([]); // Set to empty array if data is not an array
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    if (activeSection === "myDonations") {
      fetchDonations();
    }
  }, [activeSection, user]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="donor-dashboard">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">User Options</h2>
        <input
          className="sidebar-search-bar"
          type="text"
          placeholder="Search for a charity..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <ul className="sidebar-menu">
          <li
            className={`sidebar-item ${activeSection === "explore" ? "active" : ""}`}
            onClick={() => handleSidebarClick("explore")}
          >
            Explore
          </li>
          <li
            className={`sidebar-item ${activeSection === "myDonations" ? "active" : ""}`}
            onClick={() => handleSidebarClick("myDonations")}
          >
            My Donation History
          </li>
          <li className="sidebar-item">Beneficiary Story</li>
          <li className="sidebar-item">Join the Welfare</li>
          <li className="sidebar-item">Invite a Friend</li>
          <li className="sidebar-item">Logout</li>
        </ul>
      </div>
      <div className="dashboard-main-content">
        <h1 className="welcome-message">Welcome, {user.username}!</h1>

        {activeSection === "explore" && (
          <div className="charity-list-container">
            {charities.length === 0 && <div>Loading...</div>}
            {charities
              .filter((charity) =>
                charity.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((charity) => (
                <CharityCard key={charity.id} charity={charity} />
              ))}
          </div>
        )}

        {activeSection === "myDonations" && (
          <div className="donation-history-container">
            {donations.length === 0 ? (
              <div>No donations found.</div>
            ) : (
              <ul className="donation-history-list">
                {donations.map((donation) => (
                  <li key={donation.id} className="donation-history-item">
                    <p>Charity: {donation.charity_name}</p>
                    <p>Amount: ${donation.amount}</p>
                    <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
