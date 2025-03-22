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

// Function to register a new teacher
function registerTeacher($pdo, $data) {
    // Hash the password for security
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
    
    // Escape input to prevent SQL injection
    $firstName = $pdo->quote($data->firstName);
    $lastName = $pdo->quote($data->lastName);
    $username = $pdo->quote($data->username);
    $email = $pdo->quote($data->gmail); // Using 'gmail' field for email
    $linkedInUrl = $pdo->quote($data->linkedInUrl);

    // SQL to insert the new teacher into the teachers table
    $sql = "INSERT INTO teachers (first_name, last_name, username, email, password, linkedIn_url, role) 
            VALUES ($firstName, $lastName, $username, $email, '$hashedPassword', $linkedInUrl, 'instructor')";

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

// Call the registerTeacher function
$response = registerTeacher($pdo, $data);

// Return the response as JSON
echo json_encode($response);

// Close the database connection
$pdo = null;
?>
