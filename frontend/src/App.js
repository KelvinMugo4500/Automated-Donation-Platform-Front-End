// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DonatePage from './components/DonatePage';
import DonorDashboard from './components/DonorDashboard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/donate' element={<DonatePage charity="Selected Charity Name" />} />
      <Route path='/donor-dashboard' element={<DonorDashboard />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
