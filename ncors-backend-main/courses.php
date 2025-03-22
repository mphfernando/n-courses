<?php
session_start(); // Start the session

// Include the database connection
include 'conn.php'; // Ensure your database connection file is correctly included

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); // Adjust based on your frontend's URL
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Fetch all courses from the database
$query = "
    SELECT 
        courses.course_id AS id,
        courses.course_name,
        courses.course_description,
        courses.course_instructor,
        courses.course_duration,
           courses.imageUrl
    FROM 
        courses
";

$stmt = $pdo->prepare($query);
$stmt->execute();

$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the courses as JSON
echo json_encode($courses);
?>
