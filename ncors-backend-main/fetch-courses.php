<?php
// Start the session
session_start();

// Include the database connection
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Check if userId is provided via GET request
if (!isset($_GET['userId'])) {
    echo json_encode(['error' => 'User ID not provided']);
    exit;
}

// Get the user ID
$userId = $_GET['userId'];

try {
    // Prepare a query to fetch courses and the number of enrolled students for each course
    $stmt = $pdo->prepare("
        SELECT 
            c.course_name, 
            c.course_id, 
            c.course_description, 
            c.course_duration, 
            c.contentLink, 
            c.imageUrl, 
            c.category,
            COUNT(e.user_id) AS enrolledStudentAmount
        FROM courses c
        LEFT JOIN enrollments e ON c.course_id = e.course_id
        WHERE c.teacher_id = ?
        GROUP BY c.course_id
    ");
    $stmt->execute([$userId]);
    
    // Fetch all courses with the count of enrolled students
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if any courses are found
    if ($courses) {
        // Return the courses in JSON format
        echo json_encode($courses);
    } else {
        echo json_encode(['message' => 'No courses found for this user']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
