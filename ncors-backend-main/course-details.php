<?php
// Set headers to allow CORS and JSON responses
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust this to your frontend's URL
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Include your database connection file
include 'conn.php'; // Make sure the path to your database connection file is correct

// Direct database connection without a database class
try {
    $db = new PDO("mysql:host=localhost;dbname=lms", "root", ""); // Replace with your actual database details
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Check if the 'id' parameter is present in the query string
if (isset($_GET['id'])) {
    $courseId = intval($_GET['id']); // Get the course ID from the URL parameter and sanitize it

    // SQL query to fetch the course details directly
    $query = "SELECT course_name, course_description, course_instructor, course_duration, contentLink, imageUrl FROM courses WHERE course_id = $courseId";
    
    // Execute the query
    $stmt = $db->query($query);

    if ($stmt) {
        // Fetch the course data
        $course = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($course) {
            // Return the course data in JSON format
            echo json_encode($course);
        } else {
            // If no course is found, return a message
            echo json_encode(["message" => "Course not found."]);
        }
    } else {
        // If query execution fails, return an error message
        echo json_encode(["message" => "Failed to fetch course details."]);
    }
} else {
    // If 'id' parameter is missing, return an error message
    echo json_encode(["message" => "No course ID provided."]);
}
