<?php
require 'db.php';

$sql = "
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    lat REAL,
    lng REAL,
    description TEXT,
    main_image TEXT,
    rating REAL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hotel_id INTEGER NOT NULL,
    room_type TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    capacity INTEGER DEFAULT 2,
    image_url TEXT,
    amenities TEXT,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- clear old data
DELETE FROM rooms;
DELETE FROM hotels;

INSERT INTO hotels (name, location, lat, lng, description, rating, main_image) VALUES 
('The Glass Plaza Resort', 'Malibu, California', 34.0259, -118.7798, 'Experience modern luxury by the ocean.', 4.8, '/assets/hotel1.webp'),
('Skyline Vista Inn', 'Manhattan, New York', 40.7829, -73.9654, 'Stay right in the middle of the lively city.', 4.6, '/assets/hotel2.webp'),
('The Taj Mahal Palace', 'Mumbai, Maharashtra', 18.9217, 72.8332, 'Iconic sea-facing landmark offering majestic luxury.', 4.9, '/assets/mumbai1.webp'),
('The Oberoi Mumbai', 'Mumbai, Maharashtra', 18.9272, 72.8206, 'Elegant luxury on Marine Drive.', 4.8, '/assets/mumbai2.webp'),
('Udupi Grand Resort', 'Mumbai, Maharashtra', 19.0760, 72.8777, 'A peaceful resort blending traditional charm.', 4.5, '/assets/mumbai1.webp'),
('Trident Nariman Point', 'Mumbai, Maharashtra', 18.9275, 72.8208, '5-star hotel offering impeccable service.', 4.7, '/assets/mumbai2.webp'),
('ITC Maratha', 'Mumbai, Maharashtra', 19.1030, 72.8727, 'A luxury collection hotel.', 4.6, '/assets/mumbai1.webp'),
('JW Marriott Juhu', 'Mumbai, Maharashtra', 19.1025, 72.8256, 'Luxury beachside resort situated along Juhu Beach.', 4.7, '/assets/mumbai2.webp'),
('The Leela Palace New Delhi', 'New Delhi, Delhi', 28.5830, 77.1855, 'A stunning blend of Lutyens architectural grace.', 4.9, '/assets/delhi1.webp'),
('Taj Palace New Delhi', 'New Delhi, Delhi', 28.5950, 77.1652, 'Spread over 6 acres of gardens.', 4.8, '/assets/delhi2.webp'),
('ITC Maurya', 'New Delhi, Delhi', 28.5955, 77.1600, 'A premier luxury hotel.', 4.7, '/assets/delhi1.webp'),
('The Lodhi', 'New Delhi, Delhi', 28.5937, 77.2407, 'An urban oasis offering exclusivity.', 4.8, '/assets/delhi2.webp'),
('The Oberoi New Delhi', 'New Delhi, Delhi', 28.5985, 77.2384, 'Reflecting the spirit of India''s capital.', 4.9, '/assets/delhi1.webp');

-- seed rooms
INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Deluxe Room', 200.0, 2, '/assets/room1.webp', 'King Bed, Wi-Fi' FROM hotels;

INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Premium Suite', 450.0, 4, '/assets/room2.webp', 'Suite, Fast Wi-Fi, Pool Access' FROM hotels;
";

try {
    $pdo->exec($sql);
    echo "Database created and seeded successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
