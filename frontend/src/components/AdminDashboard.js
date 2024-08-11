import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const fetchCharities = async () => {
    try {
      const response = await fetch("/charities");
      const data = await response.json();
      const approved = data.filter((charity) => charity.status === "approved");
      const pending = data.filter((charity) => charity.status === "pending");
      setApprovedCharities(approved);
      setPendingRequests(pending);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleCharityClick = (charityId) => {
    setSelectedCharityId(charityId);
  };

  const handleReject = (id) => {
    postData(id, "reject");
  };

  return (
    <div className="grid-container">
      <div className="admin-dashboard">
        <div className="approved-charities">
          <h2>Approved Charities</h2>

          <div className="charityList">
            {approvedCharities.map((charity) => (
              <div
                key={charity.id}
                className="listElements"
                onClick={() => handleCharityClick(charity.id)}
              >
                {charity.name} <p className="reviewp">Click to Review</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pending-requests">
          <h2>Pending Charity Requests</h2>

          {selectedCharityId && (
            <CharityDashboard
              charityId={selectedCharityId}
              user={user}
              approvedCharities={approvedCharities}
              setApprovedCharities={setApprovedCharities}
              pendingRequests={pendingRequests}
              setPendingRequests={setPendingRequests}
            />
          )}
          {pendingRequests.map((charity) => (
            <div
              key={charity.id}
              className="listElements"
              onClick={() => handleCharityClick(charity.id)}
            >
              {charity.name} <p className="reviewp">Click to Review</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
