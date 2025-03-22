<?php
// Start the session
session_start();

// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: POST'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the data was decoded correctly
if (is_null($data)) {
    echo json_encode(['error' => 'Invalid JSON input']);
    exit; // Stop further execution
}

// Extract the data fields from the request
$userId = $data->userId; // User ID of the instructor
$courseName = $data->courseName;
$courseDescription = $data->courseDescription;
$courseDuration = $data->courseDuration;
$contentLink = $data->contentLink;
$imageUrl = $data->imageUrl;
$courseCategory = $data->courseCategory;

// Step 1: Fetch the instructor's name from the 'teachers' table using the userId
$stmt = $pdo->prepare("SELECT first_name FROM teachers WHERE id = ?");
$stmt->execute([$userId]);
$instructor = $stmt->fetchColumn();

if (!$instructor) {
    echo json_encode(['error' => 'Instructor not found']);
    exit; // Stop further execution if the instructor is not found
}

// Step 2: Insert the course details into the 'courses' table with the instructor's name
$stmt = $pdo->prepare("
    INSERT INTO courses (teacher_id, course_instructor, course_name, course_description, course_duration, contentLink, imageUrl, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$result = $stmt->execute([$userId, $instructor, $courseName, $courseDescription, $courseDuration, $contentLink, $imageUrl, $courseCategory]);

// Step 3: Return success or error response based on the query execution result
if ($result) {
    echo json_encode(['message' => 'Course added successfully']);
} else {
    echo json_encode(['error' => 'Failed to add course']);
}

// Close the database connection
$pdo = null;
?>
