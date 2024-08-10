import React, { useState, useEffect } from "react";
import "./CharityDashboard.css";
import { Link } from "react-router-dom";
const CharityDashboard = ({ user, charityId }) => {
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    const fetchCharity = async () => {
      try {
        const response = await fetch(`/charities/${charityId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const charityData = await response.json();
        setCharity(charityData);
        console.log(charityData);
      } catch (error) {
        console.error("Error fetching charity data:", error);
      }
    };

    fetchCharity();

    return () => {
      // Cleanup function
    };
  }, [charityId]);

  const getData = async (id, endpoint) => {
    try {
      const response = await fetch(`/${endpoint}/${id}`, { method: "GET" });
      const data = await response.json();
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonations = (id) => {
    getData(id, "donations");
  };

  const handleTotalAmount = (id) => {
    getData(id, "total");
  };

  const handleDelete = (id) => {
    deleteData(id, "delete");
  };
  const handleClick = () => {
    setCharity(null);
  };

  if (!charity) {
    return <div></div>;
  }

  return (
    <>
      <div className="popup">
        {!charity && <div>Loading...</div>}
        <div className="close-icon" onClick={handleClick}>
          <Link to="/admin_dashboard" className="close-icon">
            &#10005;
          </Link>
        </div>

        <div className="button-container">
          <button
            onClick={() => handleDonations(charity.id)}
            className="button"
          >
            View Donations
          </button>
          <button onClick={() => handleDelete(charity.id)} className="button">
            Delete
          </button>
          <button
            onClick={() => handleTotalAmount(charity.id)}
            className="button"
          >
            View Amount
          </button>
        </div>
        <div className="body">
          <h3>{charity.name}</h3>
          <p>{charity.description}</p>
          <p>
            A total amount of KSH.{charity.amount} has been donated to this
            charity
          </p>
        </div>
        <div className="bottom-line">Send a message</div>
      </div>
    </>
  );
};

export default CharityDashboard;
