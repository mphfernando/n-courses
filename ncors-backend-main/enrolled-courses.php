<?php
session_start(); // Start the session

// Include the database connection
include 'conn.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Check if the user ID is provided in the URL
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

$user_id = $_GET['id']; // Get the user ID from the query parameter

// Validate the user ID (optional but recommended)
if (!is_numeric($user_id)) {
    echo json_encode(['error' => 'Invalid User ID']);
    exit;
}

// Fetch the user's enrolled courses using the user ID from the query parameter
$query = "
    SELECT 
        enrollments.*,
        courses.course_name,
        courses.course_description,
        courses.course_instructor,
        courses.course_duration,
         courses.contentLink,
         courses.imageUrl
    FROM 
        enrollments 
    JOIN 
        courses ON enrollments.course_id = courses.course_id 
    WHERE 
        enrollments.user_id = ?
";

$stmt = $pdo->prepare($query);
$stmt->execute([$user_id]); // Correctly pass the user_id as a parameter

$enrolledCourses = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the enrolled courses as JSON
echo json_encode($enrolledCourses);
?>
