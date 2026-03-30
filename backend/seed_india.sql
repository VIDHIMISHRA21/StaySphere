USE hotel_staysphere;

-- Insert Mumbai Hotels
INSERT INTO hotels (name, location, lat, lng, description, rating, main_image) VALUES 
('The Taj Mahal Palace', 'Mumbai, Maharashtra', 18.9217, 72.8332, 'Iconic sea-facing landmark offering majestic luxury and panoramic views of the Arabian Sea.', 4.9, '/assets/mumbai1.webp'),
('The Oberoi Mumbai', 'Mumbai, Maharashtra', 18.9272, 72.8206, 'Elegant luxury on Marine Drive with unparalleled views of the ocean and the Queen''s Necklace.', 4.8, '/assets/mumbai2.webp'),
('Udupi Grand Resort', 'Mumbai, Maharashtra', 19.0760, 72.8777, 'A peaceful resort blending traditional charm with modern comforts in the heart of Mumbai.', 4.5, '/assets/mumbai1.webp'),
('Trident Nariman Point', 'Mumbai, Maharashtra', 18.9275, 72.8208, '5-star hotel offering impeccable service, spectacular views, and central proximity to the business district.', 4.7, '/assets/mumbai2.webp'),
('ITC Maratha', 'Mumbai, Maharashtra', 19.1030, 72.8727, 'A luxury collection hotel, echoing the grandeur of the Maratha dynasty.', 4.6, '/assets/mumbai1.webp'),
('JW Marriott Juhu', 'Mumbai, Maharashtra', 19.1025, 72.8256, 'Luxury beachside resort situated along the sands of Juhu Beach.', 4.7, '/assets/mumbai2.webp'),
('The Leela Mumbai', 'Mumbai, Maharashtra', 19.1075, 72.8804, 'Set amidst acres of lush gardens and waterfalls, an oasis of tranquility.', 4.8, '/assets/mumbai1.webp'),
('Novotel Mumbai Juhu Beach', 'Mumbai, Maharashtra', 19.1084, 72.8252, 'Breathtaking ocean-view hotel merging business and leisure elements seamlessly.', 4.4, '/assets/mumbai2.webp'),
('Grand Hyatt Mumbai', 'Mumbai, Maharashtra', 19.0775, 72.8510, 'A contemporary lifestyle destination sprawling across 12 acres of greenery.', 4.6, '/assets/mumbai1.webp'),
('Taj Santacruz', 'Mumbai, Maharashtra', 19.0911, 72.8530, 'Infused with the spirit of the city, representing a fusion of traditional Indian art and modern luxury.', 4.7, '/assets/mumbai2.webp');

-- Insert Delhi Hotels
INSERT INTO hotels (name, location, lat, lng, description, rating, main_image) VALUES 
('The Leela Palace New Delhi', 'New Delhi, Delhi', 28.5830, 77.1855, 'A stunning blend of Lutyens architectural grace and royal Indian culture.', 4.9, '/assets/delhi1.webp'),
('Taj Palace New Delhi', 'New Delhi, Delhi', 28.5950, 77.1652, 'Spread over 6 acres of gardens, this hotel is a haven of luxury in the capital.', 4.8, '/assets/delhi2.webp'),
('ITC Maurya', 'New Delhi, Delhi', 28.5955, 77.1600, 'A premier luxury hotel acknowledging the majestic Mauryan dynasty.', 4.7, '/assets/delhi1.webp'),
('The Lodhi', 'New Delhi, Delhi', 28.5937, 77.2407, 'An urban oasis offering exclusivity and contemporary elegance.', 4.8, '/assets/delhi2.webp'),
('The Oberoi New Delhi', 'New Delhi, Delhi', 28.5985, 77.2384, 'Reflecting the spirit of India''s capital in a harmonious blend of tradition and contemporary sophistication.', 4.9, '/assets/delhi1.webp'),
('Roseate House New Delhi', 'New Delhi, Delhi', 28.5522, 77.1214, 'A contemporary narrative of luxury in the vibrant aerodynamic hub of the city.', 4.6, '/assets/delhi2.webp'),
('JW Marriott Hotel New Delhi Aerocity', 'New Delhi, Delhi', 28.5525, 77.1200, 'Experience 5-star luxury and world-class service near the airport.', 4.7, '/assets/delhi1.webp'),
('Le Meridien New Delhi', 'New Delhi, Delhi', 28.6212, 77.2181, 'Modern, stylish hotel located in the heart of the city.', 4.5, '/assets/delhi2.webp'),
('The Imperial New Delhi', 'New Delhi, Delhi', 28.6262, 77.2185, 'A majestic hotel reflecting the heritage and legacy of a bygone era.', 4.8, '/assets/delhi1.webp'),
('Shangri-La Eros New Delhi', 'New Delhi, Delhi', 28.6216, 77.2183, 'Providing a tranquil oasis in the bustling heart of Connaught Place.', 4.7, '/assets/delhi2.webp');

-- Insert dummy rooms for Mumbai hotels (let's do 2 rooms per hotel)
INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Deluxe Sea View', 250.00, 2, '/assets/room1.webp', 'King Bed, Ocean View, Wi-Fi' FROM hotels WHERE location LIKE '%Mumbai%';

INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Executive Suite', 450.00, 4, '/assets/room2.webp', 'Suite, City View, Pool Access, Wi-Fi' FROM hotels WHERE location LIKE '%Mumbai%';

-- Insert dummy rooms for Delhi hotels
INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Premium Heritage Room', 200.00, 2, '/assets/room1.webp', 'King Bed, Garden View, Wi-Fi' FROM hotels WHERE location LIKE '%Delhi%';

INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Presidential Suite', 650.00, 2, '/assets/room2.webp', 'King Bed, Plunge Pool, Butler Service' FROM hotels WHERE location LIKE '%Delhi%';
