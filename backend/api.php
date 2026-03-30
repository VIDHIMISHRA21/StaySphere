<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require 'db.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    switch ($action) {
        case 'hotels':
            $stmt = $pdo->query("
                SELECT h.*, MIN(r.price_per_night) as min_price 
                FROM hotels h 
                LEFT JOIN rooms r ON h.id = r.hotel_id 
                GROUP BY h.id
            ");
            echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
            break;
            
        case 'hotel_details':
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("SELECT * FROM hotels WHERE id = ?");
            $stmt->execute([$id]);
            $hotel = $stmt->fetch();
            
            if ($hotel) {
                $stmtRooms = $pdo->prepare("SELECT * FROM rooms WHERE hotel_id = ?");
                $stmtRooms->execute([$id]);
                $hotel['rooms'] = $stmtRooms->fetchAll();
                echo json_encode(['status' => 'success', 'data' => $hotel]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Hotel not found']);
            }
            break;

        case 'bookings':
            $user_id = $_GET['user_id'] ?? 0;
            $stmt = $pdo->prepare("
                SELECT b.*, r.room_type, h.name as hotel_name 
                FROM bookings b 
                JOIN rooms r ON b.room_id = r.id 
                JOIN hotels h ON r.hotel_id = h.id 
                WHERE b.user_id = ?
            ");
            $stmt->execute([$user_id]);
            echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Unknown action']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($action) {
        case 'login':
            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                unset($user['password']);
                echo json_encode(['status' => 'success', 'data' => $user]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
            }
            break;

        case 'register':
            $name = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $password = password_hash($data['password'] ?? '', PASSWORD_DEFAULT);
            
            try {
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, 1)");
                $stmt->execute([$name, $email, $password]);
                $lastId = $pdo->lastInsertId();
                echo json_encode(['status' => 'success', 'data' => ['id' => $lastId, 'name' => $name, 'email' => $email]]);
            } catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
            }
            break;

        case 'book':
            $user_id = $data['user_id'] ?? 0;
            $room_id = $data['room_id'] ?? 0;
            $check_in = $data['check_in'] ?? '';
            $check_out = $data['check_out'] ?? '';
            $total_price = $data['total_price'] ?? 0;
            
            $stmt = $pdo->prepare("INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price, status) VALUES (?, ?, ?, ?, ?, 'confirmed')");
            if ($stmt->execute([$user_id, $room_id, $check_in, $check_out, $total_price])) {
                echo json_encode(['status' => 'success', 'message' => 'Booking confirmed']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Booking failed']);
            }
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Unknown POST action']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
