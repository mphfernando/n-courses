<?php
// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');

// Allow CORS
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // End the script for preflight requests
}

// Function to register a new user
function registerUser($pdo, $data) {
    // Hash the password for security
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
    
    // Directly execute SQL query
    $sql = "INSERT INTO users (first_name, last_name, username, email, password, role) 
            VALUES ('" . $data->firstName . "', '" . $data->lastName . "', '" . $data->username . "', '" . $data->email . "', '" . $hashedPassword . "', '" . $data->role . "')";

    try {
        // Execute the query
        $pdo->exec($sql);

        // Return a success response
        return ['message' => 'Registered successfully'];
    } catch (PDOException $e) {
        // Return an error response if registration fails
        return ['error' => 'Registration failed: ' . $e->getMessage()];
    }
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the data was decoded correctly
if (is_null($data)) {
    echo json_encode(['error' => 'Invalid JSON input']);
    exit; // Stop further execution
}

// Call the registerUser function
$response = registerUser($pdo, $data);

// Return the response as JSON
echo json_encode($response);

// Close the database connection
$pdo = null;
?>
