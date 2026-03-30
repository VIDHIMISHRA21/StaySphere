<?php
require 'db.php';

try {
    // Check if gallery column exists, if not add it
    $result = $pdo->query("PRAGMA table_info(rooms)");
    $columns = $result->fetchAll(PDO::FETCH_COLUMN, 1);
    
    if (!in_array('gallery', $columns)) {
        $pdo->exec("ALTER TABLE rooms ADD COLUMN gallery TEXT DEFAULT ''");
        echo "Gallery column added.\n";
    }

    // Now update existing rooms with proper galleries based on price
    $rooms = $pdo->query("SELECT id, image_url, price_per_night FROM rooms")->fetchAll();

    $stmt = $pdo->prepare("UPDATE rooms SET gallery = ? WHERE id = ?");

    foreach ($rooms as $room) {
        $baseImg = $room['image_url'];
        $gallery = [];
        $gallery[] = $baseImg;

        if ($room['price_per_night'] < 100) {
            $gallery[] = '/assets/bathroom_budget.webp';
        } else {
            $gallery[] = '/assets/bathroom_luxury.webp';
            $gallery[] = '/assets/room_view_balcony.webp';
        }

        // Add an extra pseudo generic image to flesh out the gallery length to 4
        if ($room['price_per_night'] >= 250) {
            $gallery[] = '/assets/hotel1.webp';
        } else {
            $gallery[] = '/assets/hotel2.webp';
        }

        $galleryStr = implode(',', $gallery);
        $stmt->execute([$galleryStr, $room['id']]);
    }
    
    echo "Successfully updated gallery images for all rooms!";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
