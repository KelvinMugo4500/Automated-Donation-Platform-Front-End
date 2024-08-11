import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CharityDashboard.css";

const CharityDashboard = ({ user }) => {
  const [charityDetails, setCharityDetails] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [stories, setStories] = useState([]);
  const [donors, setDonors] = useState([]);
  const [anonymousDonations, setAnonymousDonations] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [newStory, setNewStory] = useState({ title: '', content: '', image: '' });
  const [editBeneficiary, setEditBeneficiary] = useState(null);
  const [updatedBeneficiary, setUpdatedBeneficiary] = useState({ name: '', description: '', inventory: [] });
  const [newBeneficiary, setNewBeneficiary] = useState({ name: '', description: '', inventory: [] });
  const { username, id } = user;
  const navigate = useNavigate();

  const fetchCharityDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/charities/${id}`);
      setCharityDetails(response.data);
    } catch (error) {
      console.error("Error fetching charity details:", error);
    }
  }, [id]);

  const fetchBeneficiaries = useCallback(async () => {
    try {
      const response = await axios.get(`/charities/${id}/beneficiaries`);
      setBeneficiaries(response.data);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  }, [id]);

  const fetchStories = useCallback(async () => {
    try {
      const response = await axios.get(`/charities/${id}/stories`);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  }, [id]);

  const fetchDonorData = useCallback(async () => {
    try {
      const response = await axios.get(`/charities/${id}/donors`);
      setDonors(response.data.donors);
      setAnonymousDonations(response.data.anonymousDonations);
      setTotalDonations(response.data.totalDonations);
    } catch (error) {
      console.error("Error fetching donor data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCharityDetails();
    fetchBeneficiaries();
    fetchStories();
    fetchDonorData();
  }, [fetchCharityDetails, fetchBeneficiaries, fetchStories, fetchDonorData]);

  const handleRegisterCharity = () => {
    navigate("/create_charity");
  };

  const handlePostStory = async () => {
    try {
      await axios.post(`/charities/${id}/stories`, newStory);
      setNewStory({ title: '', content: '', image: '' });
      fetchStories(); // Refresh the stories list
    } catch (error) {
      console.error("Error posting story:", error);
    }
  };

  const handleUpdateBeneficiary = async () => {
    try {
      await axios.put(`/charities/${id}/beneficiaries/${editBeneficiary.id}`, updatedBeneficiary);
      setEditBeneficiary(null);
      setUpdatedBeneficiary({ name: '', description: '', inventory: [] });
      fetchBeneficiaries(); // Refresh the beneficiaries list
    } catch (error) {
      console.error("Error updating beneficiary:", error);
    }
  };

  const handleAddBeneficiary = async () => {
    try {
      await axios.post(`/charities/${id}/beneficiaries`, newBeneficiary);
      setNewBeneficiary({ name: '', description: '', inventory: [] });
      fetchBeneficiaries(); // Refresh the beneficiaries list
    } catch (error) {
      console.error("Error adding beneficiary:", error);
    }
  };

  return (
    <div className="charity_dashboard">
      <h1>Charity Dashboard</h1>
      <p>Welcome, {username}! Here you can manage your charity details, beneficiaries, and stories.</p>

      <button className="button" onClick={handleRegisterCharity}>
        Register a New Charity
      </button>

      {charityDetails && (
        <div className="charity_details">
          <h2>Charity Details</h2>
          <p>Name: {charityDetails.name}</p>
          <p>Description: {charityDetails.description}</p>
          <p>Mission Statement: {charityDetails.mission_statement}</p>
          <p>Goals: {charityDetails.goals}</p>
          <p>Impact: {charityDetails.impact}</p>
          <img src={charityDetails.image} alt={`${charityDetails.name} logo`} />
        </div>
      )}

      <div className="donors">
        <h2>Donors</h2>
        <h3>Non-Anonymous Donors</h3>
        {donors.filter(donor => !donor.anonymous).length > 0 ? (
          donors.filter(donor => !donor.anonymous).map(donor => (
            <div key={donor.id}>
              <p>Name: {donor.name}</p>
              <p>Donation Amount: ${donor.amount}</p>
            </div>
          ))
        ) : (
          <p>No non-anonymous donors found.</p>
        )}
        <h3>Anonymous Donors</h3>
        {donors.filter(donor => donor.anonymous).length > 0 ? (
          donors.filter(donor => donor.anonymous).map(donor => (
            <div key={donor.id}>
              <p>Donation Amount: ${donor.amount}</p>
            </div>
          ))
        ) : (
          <p>No anonymous donors found.</p>
        )}
        <div className="total_amount">
          <h3>Total Amount Donated by Anonymous Donors: ${anonymousDonations}</h3>
          <h3>Total Amount Donated: ${totalDonations}</h3>
        </div>
      </div>

      <div className="beneficiaries">
        <h2>Beneficiaries</h2>
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id}>
              <p>Name: {beneficiary.name}</p>
              <p>Description: {beneficiary.description}</p>
              <p>Inventory Sent: {beneficiary.inventory.join(', ')}</p>
              <button onClick={() => setEditBeneficiary(beneficiary)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No beneficiaries found.</p>
        )}
        <div className="add_beneficiary">
          <h3>Add New Beneficiary</h3>
          <input
            type="text"
            placeholder="Beneficiary Name"
            value={newBeneficiary.name}
            onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
          />
          <textarea
            placeholder="Beneficiary Description"
            value={newBeneficiary.description}
            onChange={(e) => setNewBeneficiary({ ...newBeneficiary, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Inventory (comma separated)"
            value={newBeneficiary.inventory.join(', ')}
            onChange={(e) => setNewBeneficiary({ ...newBeneficiary, inventory: e.target.value.split(',').map(item => item.trim()) })}
          />
          <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
        </div>
        {editBeneficiary && (
          <div className="edit_beneficiary">
            <h3>Edit Beneficiary</h3>
            <input
              type="text"
              placeholder="Beneficiary Name"
              value={updatedBeneficiary.name}
              onChange={(e) => setUpdatedBeneficiary({ ...updatedBeneficiary, name: e.target.value })}
            />
            <textarea
              placeholder="Beneficiary Description"
              value={updatedBeneficiary.description}
              onChange={(e) => setUpdatedBeneficiary({ ...updatedBeneficiary, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Inventory (comma separated)"
              value={updatedBeneficiary.inventory.join(', ')}
              onChange={(e) => setUpdatedBeneficiary({ ...updatedBeneficiary, inventory: e.target.value.split(',').map(item => item.trim()) })}
            />
            <button onClick={handleUpdateBeneficiary}>Update Beneficiary</button>
          </div>
        )}
      </div>

      <div className="stories">
        <h2>Beneficiary Stories</h2>
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id}>
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              {story.image && <img src={story.image} alt={story.title} />}
            </div>
          ))
        ) : (
          <p>No stories found.</p>
        )}
        <div className="add_story">
          <h3>Add New Story</h3>
          <input
            type="text"
            placeholder="Story Title"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          />
          <textarea
            placeholder="Story Content"
            value={newStory.content}
            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newStory.image}
            onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
          />
          <button onClick={handlePostStory}>Post Story</button>
        </div>
      </div>
    </div>
  );
};

export default CharityDashboard;
