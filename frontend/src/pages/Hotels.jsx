import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { MapPin, Search, Star, Filter } from 'lucide-react';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  
  // Filters
  const [priceRange, setPriceRange] = useState(1000); // Max $1000
  const [minRating, setMinRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/hotel/backend/api.php?action=hotels')
      .then(res => {
        if (res.data.status === 'success') {
          setHotels(res.data.data);
          applyFilters(res.data.data, query, 1000, 0);
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const applyFilters = (data, searchQ, priceMax, ratingMin) => {
    let result = data;
    if (searchQ) {
      result = result.filter(h => h.location.toLowerCase().includes(searchQ.toLowerCase()) || h.name.toLowerCase().includes(searchQ.toLowerCase()));
    }
    result = result.filter(h => h.min_price <= priceMax);
    result = result.filter(h => h.rating >= ratingMin);
    setFilteredHotels(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters(hotels, query, priceRange, minRating);
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setPriceRange(val);
    applyFilters(hotels, query, val, minRating);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    applyFilters(hotels, query, priceRange, rating);
  };

  if (loading) return <div className="container" style={{paddingTop: '4rem'}}>Loading...</div>;

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 80px)' }}>
      
      {/* Top Search Bar */}
      <div style={{ background: 'var(--primary)', padding: '1.5rem 0', color: 'white' }}>
        <div className="container">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', background: 'white', padding: '0.5rem', borderRadius: '8px' }}>
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', borderRight: '1px solid #e2e8f0' }}>
               <MapPin color="#64748b" size={20} />
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="City, Property Name or Location" 
                 style={{ border: 'none', outline: 'none', width: '100%', padding: '0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 600 }}
               />
             </div>
             <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem', borderRadius: '4px' }}>Search</button>
          </form>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', gap: '1.5rem', padding: '2rem 20px', alignItems: 'flex-start' }}>
        
        {/* Left Filter Sidebar */}
        <div style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '100px' }}>
          <div className="glass-panel" style={{ background: 'white', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filters
            </h3>

            {/* Price Filter */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', color: '#475569', textTransform: 'uppercase' }}>Price per night</h4>
              <p style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Up to ${priceRange}</p>
              <input 
                type="range" 
                min="50" max="1000" step="10"
                value={priceRange}
                onChange={handlePriceChange}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                <span>$50</span><span>$1000+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', color: '#475569', textTransform: 'uppercase' }}>Star Rating</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[0, 3, 4, 4.5].map(r => (
                  <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={minRating === r}
                      onChange={() => handleRatingChange(r)}
                      style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{r === 0 ? 'Any Rating' : `${r}+ Stars`}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Center List */}
        <div style={{ flex: 1, minWidth: '0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Properties showing {query ? `for "${query}"` : 'in All Locations'}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredHotels.map(hotel => (
              <div key={hotel.id} className="glass-panel" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', background: 'white' }} onClick={() => navigate(`/hotel/${hotel.id}`)}>
                <img src={hotel.main_image} alt={hotel.name} style={{ width: '220px', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{hotel.name}</h3>
                      <p style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', fontSize: '0.9rem', marginTop: '0.4rem', fontWeight: 600 }}>
                        <MapPin size={16} style={{marginRight: '4px'}}/> {hotel.location}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, background: '#1c1917', color: 'white', padding: '0.4rem 0.6rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="white"/> {hotel.rating}</span>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Excellent</p>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginTop: '1rem' }}>
                    {hotel.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Free Cancellation</span>
                       <span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Pay at Hotel</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>Only a few rooms left!</p>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>${hotel.min_price} <span style={{fontSize: '0.9rem', color: '#64748b', fontWeight: 500}}>/ night</span></h4>
                      <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.1rem' }}>+ $12 taxes & fees</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredHotels.length === 0 && (
              <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>We couldn't find any hotels matching your filters.</h3>
                <p style={{ color: '#64748b' }}>Try adjusting your price range or search location.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Map (Hidden on very small screens, 300px fixed width here) */}
        <div style={{ width: '320px', height: 'calc(100vh - 120px)', position: 'sticky', top: '100px', borderRadius: '12px', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <MapContainer center={filteredHotels.length > 0 ? [filteredHotels[0].lat, filteredHotels[0].lng] : [20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredHotels.map(hotel => (
              <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
                <Popup>
                  <strong>{hotel.name}</strong><br/>
                  ${hotel.min_price} / night
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
}
