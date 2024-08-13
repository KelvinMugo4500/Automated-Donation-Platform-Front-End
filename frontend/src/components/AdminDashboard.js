import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "./CharityCard";
import "./CharityDashboardAdmin.js";
import { Link } from "react-router-dom";
import CharityDashboardAdmin from "./CharityDashboardAdmin.js";
import ApprovedCharityCard from "./ApprovedCharityCard.js";
import PendingRequestCard from "./PendingRequestCard.js";

const AdminDashboard = ({ user }) => {
  const [charities, setCharities] = useState([]);
  const [approvedCharities, setApprovedCharities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [displayContent, setDisplayContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListElement, setSelectedListElement] = useState(null);

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

  const handleListClick = (elementName) => {
    setSelectedListElement(elementName);
    switch (elementName) {
      case "Pending Requests":
        setDisplayContent(
          <>
            <h2>Pending Requests</h2>
            <div className="renderedContent">
              {pendingRequests.map((request) => (
                <PendingRequestCard
                  request={request}
                  user={user}
                  approvedCharities={approvedCharities}
                  setApprovedCharities={setApprovedCharities}
                  pendingRequests={pendingRequests}
                  setPendingRequests={setPendingRequests}
                />
              ))}
            </div>
          </>
        );
        break;
      case "Approved Requests":
        setDisplayContent(
          <>
            <h2>Approved Requests</h2>
            <div className="renderedContent">
              {approvedCharities.map((charity) => (
                <ApprovedCharityCard
                  refreshCharities={refreshCharities}
                  charity={charity}
                  user={user}
                  approvedCharities={approvedCharities}
                  setApprovedCharities={setApprovedCharities}
                  pendingRequests={pendingRequests}
                  setPendingRequests={setPendingRequests}
                />
              ))}
            </div>
          </>
        );
        break;
      default:
        setDisplayContent([]);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  const handleReview = (item) => {
    // Handle review logic here
    // Depending on the item type, you can navigate or render something else
  };

  const handleReject = (item) => {
    // Handle reject logic here
    // Depending on the item type, you can reject the request
  };
  return (
    <>
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
            <li
              onClick={() => handleListClick("Explore")}
              className="listElements"
            >
              <strong>Explore</strong>
            </li>
            <li
              onClick={() => handleListClick("My Donation History")}
              className="listElements"
            >
              <strong>My Donation History</strong>
            </li>
            <li
              onClick={() => handleListClick("Pending Requests")}
              className="listElements"
            >
              <strong>Pending Requests</strong>
            </li>
            <li
              onClick={() => handleListClick("Approved Requests")}
              className="listElements"
            >
              <strong>Approved Requests</strong>
            </li>
            <li
              onClick={() => handleListClick("Beneficiary Story")}
              className="listElements"
            >
              <strong>Beneficiary Story</strong>
            </li>
            <li
              onClick={() => handleListClick("Join the welfare")}
              className="listElements"
            >
              <strong>Join the welfare</strong>
            </li>
            <li
              onClick={() => handleListClick("To be Admin Requests")}
              className="listElements"
            >
              <strong>To be Admin Requests</strong>
            </li>{" "}
            <li
              onClick={() => handleListClick("Invite a friend")}
              className="listElements"
            >
              <strong>Invite a friend</strong>
            </li>
            <li
              onClick={() => handleListClick("Settings")}
              className="listElements"
            >
              <strong>Settings</strong>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <h1>Welcome, {user.username}!</h1>

          <br />

          <div className="contentContainer">
            {/* Selected content based on list item or search input */}
            {displayContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
