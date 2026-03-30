<?php
require 'db.php';

$sql = "
INSERT INTO hotels (name, location, lat, lng, description, rating, main_image) VALUES 
('Sri Balaji Comforts', 'Tirupati, Andhra Pradesh', 13.6288, 79.4192, 'A comfortable, budget-friendly stay located steps away from the central bus stand.', 4.1, '/assets/tirupati1.webp'),
('Tirupati Budget Inn', 'Tirupati, Andhra Pradesh', 13.6300, 79.4200, 'Simple and clean rooms perfect for pilgrims and families on a budget.', 3.9, '/assets/tirupati1.webp');

-- seed rooms
INSERT INTO rooms (hotel_id, room_type, price_per_night, capacity, image_url, amenities) 
SELECT id, 'Standard Double Room', 45.0, 2, '/assets/tirupati_room.webp', 'Twin Bed, AC, Clean Bathroom' FROM hotels WHERE location LIKE '%Tirupati%';
";

try {
    $pdo->exec($sql);
    echo "Tirupati hotels seeded successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
