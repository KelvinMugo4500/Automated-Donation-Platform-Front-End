import React from "react";
import "./ApprovedCharityCard.css";
import CharityDashboardAdmin from "./CharityDashboardAdmin";
import { useState } from "react";

const ApprovedCharityCard = ({
  charity,
  user,
  charityId,
  approvedCharities,
  setApprovedCharities,
  pendingRequests,
  setPendingRequests,
  refreshCharities,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharityId, setSelectedCharityId] = useState(null);

  const handleReview = () => {
    setSelectedCharityId(charity.id);
    console.log(selectedCharityId);
    setShowModal(true);
  };
  const handleReject = (item) => {
    // Handle reject logic here
    // Depending on the item type, you can reject the request
  };

  return (
    <div className="card">
      <strong>{charity.name}</strong>
      <img className="image1" src={charity.image} alt="Mission" />
      <strong>{charity.mission_statement}</strong>

      <button className="button1" onClick={handleReview}>
        Review
      </button>

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

export default ApprovedCharityCard;
