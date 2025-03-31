import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Competitions from './pages/Competitions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" /> : 
                  <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                  <Navigate to="/dashboard" /> : 
                  <Register />
              } 
            />
            
            {/* Rutas protegidas */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                  <Dashboard onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
              } 
            />
            <Route 
              path="/athletes/*" 
              element={
                isAuthenticated ? 
                  <Athletes /> : 
                  <Navigate to="/login" />
              } 
            />
            <Route 
              path="/competitions/*" 
              element={
                isAuthenticated ? 
                  <Competitions /> : 
                  <Navigate to="/login" />
              } 
            />
            <Route 
              path="/results" 
              element={
                isAuthenticated ? 
                  <Results /> : 
                  <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? 
                  <Profile onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
              } 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;