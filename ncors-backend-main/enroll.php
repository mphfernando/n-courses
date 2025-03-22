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

// Function to enroll a user in a course
function enrollUserInCourse($pdo, $data) {
    // Escape input to prevent SQL injection
    $userId = $pdo->quote($data->userId);
    $courseId = $pdo->quote($data->courseId);

    // SQL to insert the new enrollment record
    $sql = "INSERT INTO enrollments (user_id, course_id) VALUES ($userId, $courseId)";

    try {
        // Execute the query
        $pdo->exec($sql);

        // Return a success response
        return ['message' => 'Enrollment successful'];
    } catch (PDOException $e) {
        // Return an error response if enrollment fails
        return ['error' => 'Enrollment failed: ' . $e->getMessage()];
    }
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the data was decoded correctly
if (is_null($data)) {
    echo json_encode(['error' => 'Invalid JSON input']);
    exit; // Stop further execution
}

// Call the enrollUserInCourse function
$response = enrollUserInCourse($pdo, $data);

// Return the response as JSON
echo json_encode($response);

// Close the database connection
$pdo = null;
?>
