import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ user }) => {
  const [approvedCharities, setApprovedCharities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const postData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, { method: "POST" });
      const data = await response.json();

      console.log(`/${endpoint}/${id}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch("/charities")
      .then((response) => response.json())
      .then((data) => {
        const approved = data.filter(
          (charity) => charity.status === "approved"
        );
        const pending = data.filter((charity) => charity.status === "pending");
        setApprovedCharities(approved);
        setPendingRequests(pending);
      })
      .catch((error) => console.error(error));
  }, [postData, approvedCharities]);

  const handleReview = (id) => {
    postData(id, "review");
  };

  const handleApprove = (id) => {
    postData(id, "approve");
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
              <button className="button-container">
                <button className="button-donations">View Donations</button>
                <button className="button-delete">Delete</button>
                <button className="button-total-amount">View Amount</button>
              </button>
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
            <div key={charity.id}>
              <p>{charity.name}</p>
              <div className="button-container">
                <button
                  className="button-review"
                  onClick={() => handleReview(charity.id)}
                >
                  Review
                </button>
                <button
                  className="button-approve"
                  onClick={() => handleApprove(charity.id)}
                >
                  Approve
                </button>
                <button
                  className="button-reject"
                  onClick={() => handleReject(charity.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
