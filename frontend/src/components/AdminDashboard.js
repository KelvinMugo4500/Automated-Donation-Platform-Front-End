import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "./CharityCard";
import "./CharityDashboard.js";
import { Link } from "react-router-dom";
import CharityDashboard from "./CharityDashboard.js";

const AdminDashboard = ({ user }) => {
  const [charities, setCharities] = useState([]);
  const [approvedCharities, setApprovedCharities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedCharityId, setSelectedCharityId] = useState(null);

  const postData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, {
        method: "POST",
      });
      const data = await response.json();

      refreshCharities();
      console.log(`/${endpoint}/${id}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, { method: "GET" });
      const data = await response.json();

      console.log(`/${endpoint}/${id}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      refreshCharities();
      console.log(`/${endpoint}/${id}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshCharities = async () => {
    try {
      const response = await fetch("/charities");
      const charities = await response.json();

      const approved = charities.filter(
        (charity) => charity.status === "approved"
      );
      const pending = charities.filter(
        (charity) => charity.status === "pending"
      );

      setApprovedCharities(approved);
      setPendingRequests(pending);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshCharities();
  }, []);

  const handleReview = (id) => {
    postData(id, "review");
  };

  const handleCharityClick = (charityId) => {
    setSelectedCharityId(charityId);
  };

  return (
    <div className="grid-container">
      <div className="admin-dashboard">
        <div className="approved-charities">
          <h2>Approved Charities</h2>
          <h4>Hello {user.username}! click a charity to take action.</h4>
          <div className="charityList">
            {approvedCharities.map((charity) => (
              <div
                key={charity.id}
                className="charityItem"
                onClick={() => handleCharityClick(charity.id)}
              >
                {charity.name}
              </div>
            ))}
          </div>
          {selectedCharityId && (
            <CharityDashboard charityId={selectedCharityId} user={user} />
          )}
        </div>

        <div className="pending-requests">
          <h2>Pending Charity Requests</h2>
          <h4>
            ...and all the pending charity requests are listed below, you can
            review them and choose whether to approve or reject the request of
            them being a charity.
          </h4>
          {pendingRequests.map((charity) => (
            <div
              key={charity.id}
              onClick={() => handleCharityClick(charity.id)}
            >
              <p>{charity.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
