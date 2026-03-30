CREATE DATABASE IF NOT EXISTS hotel_staysphere;
USE hotel_staysphere;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    description TEXT,
    main_image VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    room_type VARCHAR(100) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    capacity INT DEFAULT 2,
    image_url VARCHAR(255),
    amenities TEXT,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Insert dummy hotels
INSERT INTO hotels (name, location, lat, lng, description, rating, main_image) VALUES 
('The Glass Plaza Resort', 'Malibu, California', 34.0259, -118.7798, 'Experience modern luxury by the ocean with stunning glassmorphic architecture.', 4.8, '/assets/hotel1.webp'),
('Skyline Vista Inn', 'Manhattan, New York', 40.7829, -73.9654, 'Stay right in the middle of the lively city with beautiful skyline views.', 4.6, '/assets/hotel2.webp');

-- Insert dummy rooms
INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) VALUES 
(1, 'Ocean View Suite', 350.00, 2, '/assets/room1.webp', 'King Bed, Balcony, Mini-bar, Wi-Fi'),
(1, 'Tropical Deluxe', 200.00, 4, '/assets/room2.webp', 'Queen Beds, Pool Access, Wi-Fi'),
(2, 'Penthouse', 550.00, 2, '/assets/room1.webp', 'King Bed, City View, Jacuzzi, Wi-Fi');
