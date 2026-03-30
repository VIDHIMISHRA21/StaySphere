import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, User as UserIcon, Briefcase, Wallet, Star, Ticket, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    axios.get(`http://localhost/hotel/backend/api.php?action=bookings&user_id=${user.id}`)
      .then(res => {
        if (res.data.status === 'success') {
          setBookings(res.data.data);
        }
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) return <div className="container" style={{paddingTop: '2rem'}}>Loading...</div>;

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <div 
      onClick={() => setActiveTab(id)}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
        cursor: 'pointer', borderRadius: '8px',
        background: activeTab === id ? 'var(--primary)' : 'transparent',
        color: activeTab === id ? 'white' : '#475569',
        fontWeight: activeTab === id ? 600 : 500,
        transition: 'all 0.2s'
      }}
    >
      <Icon size={20} /> {label}
    </div>
  );

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 80px)', padding: '2rem 0' }}>
      <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div className="glass-panel" style={{ padding: '2rem 1.5rem', background: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2e8f0', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserIcon size={40} color="#94a3b8" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user?.name}</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{user?.email}</p>
              <div style={{ marginTop: '1rem', display: 'inline-flex', background: '#fef3c7', color: '#d97706', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                GOLD MEMBER
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <SidebarItem id="profile" icon={UserIcon} label="My Profile" />
              <SidebarItem id="trips" icon={Briefcase} label="My Trips" />
              <SidebarItem id="wallet" icon={Wallet} label="Wallet & Rewards" />
              <SidebarItem id="offers" icon={Ticket} label="Exclusive Offers" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, minWidth: '0' }}>
          
          {activeTab === 'profile' && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.85rem' }}>Full Name</label>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.25rem' }}>{user?.name}</p>
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.85rem' }}>Email Address</label>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.25rem' }}>{user?.email}</p>
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.85rem' }}>Phone Number</label>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.25rem' }}>+91 98765 43210</p>
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.85rem' }}>Date of Birth</label>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.25rem' }}>01 Jan 1990</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 800 }}>My Trips</h2>
              
              {bookings.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Briefcase size={60} color="#cbd5e1" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Looks empty, you've no upcoming bookings.</h3>
                  <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>When you book a trip, you will see your itinerary here.</p>
                  <button className="btn btn-primary" onClick={() => navigate('/hotels')} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                    Plan a Trip
                  </button>
                  
                  <div style={{ marginTop: '3rem', width: '100%', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Star color="#f59e0b" /> Recommended for You</h4>
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                       <div style={{ minWidth: '200px', cursor: 'pointer' }} onClick={() => navigate('/hotels?q=mumbai')}>
                         <img src="/assets/mumbai1.webp" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}/>
                         <h5 style={{ fontWeight: 600 }}>Mumbai Getaways</h5>
                       </div>
                       <div style={{ minWidth: '200px', cursor: 'pointer' }} onClick={() => navigate('/hotels?q=delhi')}>
                         <img src="/assets/delhi1.webp" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}/>
                         <h5 style={{ fontWeight: 600 }}>Delhi Heritage</h5>
                       </div>
                       <div style={{ minWidth: '200px', cursor: 'pointer' }} onClick={() => navigate('/hotels?q=tirupati')}>
                         <img src="/assets/mumbai2.webp" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}/>
                         <h5 style={{ fontWeight: 600 }}>Tirupati Pilgrimage</h5>
                       </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {bookings.map(booking => (
                    <div key={booking.id} className="glass-panel" style={{ padding: '1.5rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                         <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                           <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>{new Date(booking.check_in).toLocaleString('default', {month: 'short'})}</span>
                           <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{new Date(booking.check_in).getDate()}</span>
                         </div>
                         <div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
                             <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{booking.hotel_name}</h3>
                             <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Confirmed</span>
                           </div>
                           <p style={{ color: '#475569', fontWeight: 500, marginBottom: '0.25rem' }}>{booking.room_type}</p>
                           <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.85rem' }}>
                             <Calendar size={14} /> {booking.check_in} to {booking.check_out}
                           </p>
                         </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Paid</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark)' }}>${booking.total_price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', background: 'white' }}>
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', borderRadius: '12px', padding: '2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                   <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>StaySphere Wallet Balance</p>
                   <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>$1,450.00</h2>
                 </div>
                 <Wallet size={80} opacity={0.2} style={{ position: 'absolute', right: '4rem' }}/>
              </div>
              <h3 style={{ marginTop: '2rem', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Transactions</h3>
              <p style={{ color: '#64748b' }}>No recent wallet transactions.</p>
            </div>
          )}
          
          {activeTab === 'offers' && (
             <div className="glass-panel animate-fade-in" style={{ padding: '2rem', background: 'white' }}>
               <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Exclusive Offers for You</h2>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1.5rem', background: '#f8fafc' }}>
                   <Ticket color="#ec4899" size={30} style={{ marginBottom: '1rem' }}/>
                   <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Flat 20% OFF on Domestic Hotels</h4>
                   <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Use code <strong style={{ color: '#0f172a' }}>STAYINDIA20</strong> at checkout.</p>
                   <button className="btn btn-secondary" style={{ width: '100%' }}>Copy Code</button>
                 </div>
                 <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1.5rem', background: '#f8fafc' }}>
                   <Ticket color="#3b82f6" size={30} style={{ marginBottom: '1rem' }}/>
                   <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Up to $50 Cashback via PayPal</h4>
                   <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Valid for your first hotel booking.</p>
                   <button className="btn btn-secondary" style={{ width: '100%' }}>Claim Offer</button>
                 </div>
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
