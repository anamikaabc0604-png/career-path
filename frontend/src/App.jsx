import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Roadmap from './pages/Roadmap';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Routes>
        {/* Public Routes with Main Layout (Navbar + Footer) */}
        <Route path="/" element={
          <>
            <Navbar />
            <main className="flex-grow"><Homepage /></main>
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <main className="flex-grow"><Login /></main>
            <Footer />
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar />
            <main className="flex-grow"><Register /></main>
            <Footer />
          </>
        } />

        {/* Protected Dashboard Routes (DashboardLayout is inside the page component for now, or we can wrap here) */}
        {/* Since Dashboard component includes DashboardLayout, we just route to it directly */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/skills" element={<Skills />} />
        <Route path="/dashboard/roadmap" element={<Roadmap />} />
        <Route path="/dashboard/jobs" element={<Jobs />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
