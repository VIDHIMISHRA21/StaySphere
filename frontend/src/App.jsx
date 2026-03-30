import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Hotel, User, LogOut, Plane, Car, Compass, Train } from 'lucide-react';
import './index.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="container nav-container" style={{ padding: '0.5rem 0' }}>
        <Link to="/" className="nav-brand">
          <Hotel color="#2563eb" size={28} />
          StaySphere
        </Link>
        <div className="nav-links" style={{ gap: '1.5rem' }}>
          <Link to="/" className="nav-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}><Plane size={20} color="#94a3b8" style={{marginBottom: '4px'}}/> Flights</Link>
          <Link to="/hotels" className="nav-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}><Hotel size={20} style={{marginBottom: '4px'}}/> Hotels</Link>
          <span className="nav-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#64748b', cursor: 'not-allowed', opacity: 0.5 }}><Train size={20} color="#94a3b8" style={{marginBottom: '4px'}}/> Trains</span>
          <span className="nav-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#64748b', cursor: 'not-allowed', opacity: 0.5 }}><Car size={20} color="#94a3b8" style={{marginBottom: '4px'}}/> Cabs</span>
          
          <div style={{ height: '30px', width: '1px', background: '#e2e8f0', margin: '0 1rem' }}></div>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '24px' }}>
                <div style={{ background: '#cbd5e1', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={14} color="white"/></div>
                {user.name}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '0.4rem 1rem', fontSize: '0.8rem'}}>
                <LogOut size={16} style={{marginRight: '4px'}} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" className="nav-link" style={{ fontWeight: 600 }}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
