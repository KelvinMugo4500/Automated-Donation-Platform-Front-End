import React, { useState, useEffect } from "react";
import "./CharityDashboard.css";
import { Link } from "react-router-dom";
const CharityDashboard = ({ user, charityId }) => {
  const [charity, setCharity] = useState(null);
  const [password, setPassword] = useState("");
  const username = user.username;
  const [donations, setDonations] = useState([]);
  const [totals, setTotals] = useState(0);

  const [showDonations, setShowDonations] = useState(false);
  const [showTotal, setShowTotals] = useState(false);
  //for the delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = (id) => {
    if (showDeleteConfirmation) {
      // Perform deletion logic here
      console.log(username, password);
      deleteData(id, "delete");
      setShowDeleteConfirmation(false);
      setCharity(null);
    } else {
      setShowDeleteConfirmation(true);
    }
  };

  // Implement the password confirmation logic here
  const confirmDelete = async (event) => {
    event.preventDefault();
    console.log(
      `${username} is the username and password inputted is ${password}`
    );

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        handleDelete(charity.id);
      }
    } catch (error) {
      console.log(username, password);
      console.error("invalid credentials", error);
    }
  };

  useEffect(() => {
    const fetchCharity = async () => {
      const response = await fetch(`/charities/${charityId}`);
      const data = await response.json();

      if (data && data.donations && data.totalDonatedAmount) {
        // Ensure donations and totalDonatedAmount are not undefined
        console.log(data.donations);
        setCharity(data);
      } else {
        console.log("did not fetch");
      }
    };

    fetchCharity();
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

  const handleDonations = async (id) => {
    setShowDonations(true);
    if (charity && charity.donations) {
      setDonations(charity.donations);
    } else {
      console.error("Error: Charity object or getDonations method is missing.");
    }
  };

  const handleTotalAmount = (id) => {
    setShowTotals(true);
    if (charity && charity.totalDonatedAmount) {
      setTotals(charity.totalDonatedAmount);
    } else {
      console.error("Error: Charity object or totals is missing.");
    }
  };

  const handleClick = () => {
    setCharity(null);
  };
  const handleClickD = () => {
    setShowDeleteConfirmation(false);
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

          {showDeleteConfirmation ? (
            <div className="popup-delete">
              <div className="close-icon" onClick={handleClickD}>
                <Link to="/admin_dashboard" className="close-icon">
                  &#10005;
                </Link>
              </div>
              <p>
                enter your password to confirm the deletion process. This
                processes cannot be...
              </p>
              <form onSubmit={confirmDelete}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button type="submit" className="confirm-delete">
                  confirm deletion
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => handleDelete(charity.id)}
              className="confirm-delete"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => handleTotalAmount(charity.id)}
            className="button"
          >
            Totals
          </button>
        </div>
        <div className="container">
          <div className="body">
            <p>{charity.description}</p>
            <p>
              A total amount of KSH.{charity.amount} has been donated to this
              charity
            </p>
          </div>
          {showDonations && (
            <div>
              <h2>Donation History</h2>
              <ul>
                {donations.map((donation, index) => (
                  <li key={index}>
                    <p>Donor: {donation.donor}</p>
                    <p>Amount: ${donation.amount}</p>
                    <p>Date: {donation.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showTotal && (
            <div>
              <h2>Totals</h2>
              <p>
                {charity.name} has managed to amass a total of{" "}
                {charity.totalDonatedAmount} as of today. click the View
                donations button to check or find a specific
                donation/transaction.
              </p>
            </div>
          )}
        </div>

        <div className="bottom-line">Send a message</div>
      </div>
    </>
  );
};

export default CharityDashboard;
