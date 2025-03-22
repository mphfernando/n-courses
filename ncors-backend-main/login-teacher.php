<?php
// Start the session
session_start();

// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); 
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the data was decoded correctly
if (is_null($data)) {
    echo json_encode(['error' => 'Invalid JSON input']);
    exit; // Stop further execution
}

// Prepare to check user credentials
$email = $data->email;
$password = $data->password;

// Query to find the user by email
$stmt = $pdo->prepare("SELECT id, password FROM teachers WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Check if the user is found and verify password
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];

    // Hard-code the role as 'student'
    $_SESSION['role'] = 'teacher';

    // Return a success response with hard-coded role
    echo json_encode([
        'message' => 'success',
        'user_id' => $_SESSION['user_id'],
        'role' => $_SESSION['role'] // Include hard-coded role in the response
    ]);
} else {
    echo json_encode(['error' => 'Invalid email or password']);
}

// Close the database connection
$pdo = null;
?>
