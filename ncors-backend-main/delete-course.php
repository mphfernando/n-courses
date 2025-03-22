<?php
// Start the session
session_start();

// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: DELETE'); // Allow DELETE method
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Get the raw DELETE data (course_id)
$input = json_decode(file_get_contents("php://input"), true);

// Check if course_id is provided
if (!isset($input['course_id'])) {
    echo json_encode(['error' => 'Course ID not provided']);
    exit;
}

// Get the course ID
$courseId = $input['course_id'];

try {
    // Prepare a query to delete the course
    $stmt = $pdo->prepare("DELETE FROM courses WHERE course_id = :courseId");
    $stmt->bindParam(':courseId', $courseId, PDO::PARAM_INT);
    $stmt->execute();

    // Check if the deletion was successful
    if ($stmt->rowCount()) {
        echo json_encode(['message' => 'Course deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete course or course not found']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
