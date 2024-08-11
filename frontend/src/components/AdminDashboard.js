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
  const navigate = useNavigate();

  const postData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, { method: "POST" });
      const data = await response.json();

      refreshCharities();
      console.log(`/${endpoint}/${id}`);
      console.log(data);

      if (endpoint === "approve" && data.success) {
        // Redirect to charity dashboard on approval
        navigate(`/charity-dashboard/${id}`);
      } else if (endpoint === "reject" && data.success) {
        // Notify charity about rejection
        alert("The charity application has been rejected.");
      }

      // Refresh pending requests and approved charities after action
      fetchCharities();
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleReview = (id) => {
    postData(id, "review");
  };

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
          <h4>
            {user.username}! Here you can manage all the approved charities.
          </h4>
          {approvedCharities.map((charity) => (
            <div key={charity.id}>
              <p>{charity.name}</p>
              <div className="button-container">
                <button className="button-donations">View Donations</button>
                <button className="button-delete">Delete</button>
                <button className="button-total-amount">View Amount</button>
              </div>
            </div>
          ))}
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
