import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?q=${location}`);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('/assets/hotel1.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Find Your Next Perfect Stay
          </h1>
          <p className="animate-fade-in" style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9 }}>
            Explore luxurious glassmorphic resorts and premium spaces curated for you.
          </p>

          <form onSubmit={handleSearch} className="glass-panel animate-fade-in" style={{
            display: 'flex', gap: '1rem', padding: '1rem', maxWidth: '900px', margin: '0 auto', flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.4)'
          }}>
            <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', background: 'white', borderRadius: '8px', padding: '0.5rem 1rem' }}>
              <MapPin color="#64748b" size={20} />
              <input 
                type="text" 
                placeholder="Where to?" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '0.5rem', width: '100%', color: '#0f172a' }}
              />
            </div>
            <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', background: 'white', borderRadius: '8px', padding: '0.5rem 1rem' }}>
              <Calendar color="#64748b" size={20} />
              <input type="date" style={{ border: 'none', outline: 'none', padding: '0.5rem', width: '100%', color: '#0f172a' }} />
            </div>
            <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', background: 'white', borderRadius: '8px', padding: '0.5rem 1rem' }}>
              <Users color="#64748b" size={20} />
              <select style={{ border: 'none', outline: 'none', padding: '0.5rem', width: '100%', color: '#0f172a' }}>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ flex: '0 0 auto', padding: '0 2rem' }}>
              <Search style={{marginRight: '8px'}} size={20}/> Search
            </button>
          </form>
        </div>
      </section>

      {/* Offers Section */}
      <section className="container" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#fef08a', color: '#854d0e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Offers</span>
          Exclusive Deals
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ minWidth: '350px', background: 'linear-gradient(to right, #ec4899, #f43f5e)', color: 'white', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(236,72,153,0.3)' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Save up to 40%</h4>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.2rem' }}>On your first domestic hotel booking.</p>
              <button className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Claim Now</button>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 800, opacity: 0.2 }}>%</div>
          </div>
          <div style={{ minWidth: '350px', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', color: 'white', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Free Cancellation</h4>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.2rem' }}>On 1000+ budget hotels across India.</p>
              <button className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Explore</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Popular Destinations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/hotels?q=Mumbai')}>
            <img src="/assets/mumbai1.webp" alt="Mumbai" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mumbai Getaways</h3>
              <p style={{ color: '#64748b', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}><MapPin size={16} /> Maharashtra</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.25rem' }}>From $150</span>
                <span style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Top Rated</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/hotels?q=Delhi')}>
            <img src="/assets/delhi1.webp" alt="Delhi" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Delhi Heritage</h3>
              <p style={{ color: '#64748b', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}><MapPin size={16} /> New Delhi</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.25rem' }}>From $120</span>
                <span style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Trending</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/hotel/14')}>
            <img src="/assets/tirupati1.webp" alt="Tirupati Budget" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Sri Balaji Comforts</h3>
              <p style={{ color: '#64748b', marginTop: '0.5rem', display: 'flex', alignItems: 'center' }}><MapPin size={16} /> Tirupati Pilgrimage</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.25rem' }}>Budget • $45</span>
                <span style={{ background: '#3b82f6', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Affordable</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
