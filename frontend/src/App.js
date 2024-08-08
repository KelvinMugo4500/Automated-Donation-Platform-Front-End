import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DonatePage from "./components/DonatePage";
import DonorDashboard from "./components/DonorDashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CharityList from "./components/CharityList";
import AdminDashboard from "./components/AdminDashboard";
import CreateCharity from "./components/CreateCharity";
import CharityDashboard from "./components/CharityDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Waiting for login check
  }

  return (
    <Router>
      <NavBar user={user} setUser={setUser} /> {/* NavBar always visible */}
      <Routes>
        {/* Routes accessible when user is logged in */}
        {user ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/charities" element={<CharityList />} />
            <Route path="/donate" element={<DonatePage charity="Selected Charity Name" />} />
            <Route path="/donor_dashboard" element={<DonorDashboard user={user} />} />
            {user.role === "admin" && (
              <Route path="/admin_dashboard" element={<AdminDashboard user={user} />} />
            )}
            {user.role === "charity" && (
              <Route path="/charity_dashboard" element={<CharityDashboard user={user} />} />
            )}
          </>
        ) : (
          // Routes accessible when user is NOT logged in
          <>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {/* Common routes accessible regardless of login status */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page is always accessible */}
        <Route path="/charities" element={<CharityList />} /> {/* Charity list is always accessible */}
        <Route path="/create_charity" element={<CreateCharity />} />
        {/* Redirect to landing page for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer /> {/* Footer always visible */}
    </Router>
  );
};

export default App;
