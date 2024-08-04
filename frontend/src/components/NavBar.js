// src/components/NavBar.js
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  const isAdmin = user && user.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Automated Donation Platform
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          {user ? (
            <>
              {isAdmin && (
                <li className="navbar-item">
                  <Link to="/admin_dashboard" className="navbar-link">
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <Link
                  to="/logout"
                  className="navbar-link"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  SignUp
                </Link>
              </li>
            </>
          )}
          <li className="navbar-item">
            <Link to="/create_charity" className="navbar-link">
              Register Charity
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/charity_list" className="navbar-link">
              Charity List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
