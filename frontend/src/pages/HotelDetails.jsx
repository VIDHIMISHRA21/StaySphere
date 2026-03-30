import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Check, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const RoomImageGallery = ({ galleryString, roomType }) => {
  const images = galleryString ? galleryString.split(',') : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return <div style={{ width: '250px', height: '180px', background: '#f1f5f9', borderRadius: '8px' }} />;

  const nextImg = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{ position: 'relative', width: '250px', height: '180px', borderRadius: '8px', overflow: 'hidden' }}>
      <img src={images[currentIndex]} alt={`${roomType} view ${currentIndex + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      {images.length > 1 && (
        <>
          <button onClick={prevImg} style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextImg} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <ChevronRight size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ImageIcon size={10} /> {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/hotel/backend/api.php?action=hotel_details&id=${id}`)
      .then(res => {
        if (res.data.status === 'success') setHotel(res.data.data);
        setLoading(false);
      });
  }, [id]);

  const handleBookClick = (room) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please log in to book a room.");
      navigate('/login');
      return;
    }
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Simulate simple booking without calculating exact dates duration. Default to 1 night.
    axios.post('http://localhost/hotel/backend/api.php?action=book', {
      user_id: user.id,
      room_id: selectedRoom.id,
      check_in: e.target.checkIn.value,
      check_out: e.target.checkOut.value,
      total_price: selectedRoom.price_per_night
    }).then(res => {
      if(res.data.status === 'success') {
        alert("Booking successful!");
        navigate('/dashboard');
      }
    });
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!hotel) return <div className="container">Hotel not found.</div>;

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <img src={hotel.main_image} alt={hotel.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
      
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>{hotel.name}</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <MapPin size={18} style={{marginRight: '6px'}}/> {hotel.location} • <span style={{marginLeft: '10px', color: 'var(--primary)'}}>★ {hotel.rating}</span>
          </p>
          
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this property</h2>
            <p style={{ lineHeight: '1.8', color: '#334155' }}>{hotel.description}</p>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Available Rooms</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {hotel.rooms?.map(room => (
              <div key={room.id} className="glass-panel" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', flexWrap: 'wrap' }}>
                <RoomImageGallery galleryString={room.gallery || room.image_url} roomType={room.room_type} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{room.room_type}</h3>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Capacity: {room.capacity} Guests</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {room.amenities.split(',').map((amt, idx) => (
                        <span key={idx} style={{ background: '#f1f5f9', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={12} color="var(--primary)"/> {amt.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>${room.price_per_night}</span>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>/night</span>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleBookClick(room)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', background: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Complete your booking</h3>
              <button onClick={() => setShowBookingModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', p: 0 }}>
              
              <div style={{ flex: '1 1 500px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>1. Enter Dates</h4>
                <form id="booking-form" onSubmit={submitBooking}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Check In</label>
                      <input name="checkIn" type="date" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Check Out</label>
                      <input name="checkOut" type="date" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>2. Payment Details</h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Expiry</label>
                      <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>CVV</label>
                      <input type="password" placeholder="***" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                  </div>
                </form>
              </div>

              <div style={{ width: '300px', flexShrink: 0, background: '#f8fafc', padding: '2rem', borderLeft: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Price Summary</h4>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={selectedRoom?.image_url} style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedRoom?.room_type}</h5>
                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>1 Night, 2 Adults</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#475569' }}>
                  <span>Base Price</span>
                  <span>${selectedRoom?.price_per_night}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#475569' }}>
                  <span>Taxes & Fees</span>
                  <span>$12.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #cbd5e1', marginBottom: '2rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>${parseFloat(selectedRoom?.price_per_night) + 12.5}</span>
                </div>

                <button form="booking-form" type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Pay Securely</button>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', marginTop: '1rem' }}>
                   StaySphere Secure Checkout
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
