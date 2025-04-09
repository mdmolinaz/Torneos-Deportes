import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Competitions from './pages/Competitions';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/results" element={<Results />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;