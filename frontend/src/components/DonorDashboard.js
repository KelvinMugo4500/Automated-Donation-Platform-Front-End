import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";

const DonorDashboard = ({ user }) => {
  const [donations, setDonations] = useState([]);
  const { username, id, email } = user;

  const fetchData = async () => {
    try {
      const response = await axios.get(`/users/<int:id>/donations`);
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="donor_dashboard">
      <h1>Donor Dashboard</h1>
      <p>
        Welcome, {username}! Here you can manage your donations and view your
        donation history.
      </p>
      <button className="button" onClick={fetchData}>
        Click here to expand and view your donations history
      </button>{" "}
      {/* Display donations here */}
      {donations.map((donation) => (
        <div key={donation.id}>{/* Display donation details */}</div>
      ))}
    </div>
  );
};

export default DonorDashboard;
