import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;