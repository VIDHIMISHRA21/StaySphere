import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Hotel } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost/hotel/backend/api.php?action=login', { email, password })
      .then(res => {
        if (res.data.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.data.data));
          navigate('/dashboard');
        } else {
          setError(res.data.message);
        }
      })
      .catch(() => setError("Server error"));
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 80px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'url("/assets/hotel1.webp") center/cover',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
      
      <div className="glass-panel animate-fade-in" style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2.5rem',
        background: 'rgba(255, 255, 255, 0.85)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Hotel color="var(--primary)" size={40} style={{ margin: '0 auto 1rem' }}/>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark)' }}>Welcome Back</h2>
          <p style={{ color: '#64748b' }}>Log in to access your bookings</p>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              placeholder="you@example.com"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>Log In</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
