import React from "react";
import { useState } from "react";
import "./PendingRequestCard.css";
import CharityDashboardAdmin from "./CharityDashboardAdmin";

const PendingRequestCard = ({
  request,
  user,
  charityId,
  approvedCharities,
  setApprovedCharities,
  pendingRequests,
  setPendingRequests,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharityId, setSelectedCharityId] = useState(null);

  const handleReview = () => {
    setSelectedCharityId(request.id);
    console.log(selectedCharityId);
    setShowModal(true);
  };

  const handleReject = (item) => {
    // Handle reject logic here
  };

  return (
    <div className="card">
      <h1>{request.name}</h1>
      <br />
      <strong>{request.description}</strong>

      <button onClick={handleReview}>Review</button>

      {showModal && (
        <CharityDashboardAdmin
          charityId={selectedCharityId}
          user={user}
          approvedCharities={approvedCharities}
          setApprovedCharities={setApprovedCharities}
          pendingRequests={pendingRequests}
          setPendingRequests={setPendingRequests}
        />
      )}
    </div>
  );
};

export default PendingRequestCard;
