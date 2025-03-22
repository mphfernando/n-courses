<?php
// Start the session
session_start();

// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); 
header('Access-Control-Allow-Methods: GET'); // Allow GET method
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true'); // Allow credentials


// Get the user ID from the query parameters
$userId = isset($_GET['id']) ? intval($_GET['id']) : null;

// Check if user ID is provided
if (!$userId) {
    echo json_encode(['error' => 'User ID not provided']);
    exit;
}

try {
    // Prepare a query to fetch user details
    $stmt = $pdo->prepare("SELECT first_name, email FROM users WHERE id = :userId");
    $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
    $stmt->execute();

    // Fetch the user details
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists
    if ($user) {
        echo json_encode($user); // Return user details as JSON
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
