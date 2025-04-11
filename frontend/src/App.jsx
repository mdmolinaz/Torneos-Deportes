import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Competitions from './pages/Competitions';
import Categories from './pages/Categories';
import Times from './pages/Times'; // Asegúrate de que exista este archivo
import Reports from './pages/Reports'; // Asegúrate de que exista este archivo
import AthleteNew from './pages/AthleteNew'; // Asegúrate de que exista este archivo
import CompetitionNew from './pages/CompetitionNew'; // Asegúrate de que exista este archivo
import CategoryNew from './pages/CategoryNew'; // Asegúrate de que exista este archivo
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssignAthlete from './pages/AssignAthlete';
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
            <Route path="/times" element={<Times />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/athletes/new" element={<AthleteNew />} />
            <Route path="/competitions/new" element={<CompetitionNew />} />
            <Route path="/categories/new" element={<CategoryNew />} />
            <Route path="/assign-athlete" element={<AssignAthlete />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;