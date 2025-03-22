import React, { useEffect, useState } from 'react';
import './CourseInfo.css'; // Ensure appropriate CSS for styling

const CourseInfoSmall = () => {
  const [course, setCourse] = useState(null);

  // Pure JavaScript to get the 'courseId' from the URL
  const url = window.location.href; // Get the current URL
  const courseId = url.split('/').pop(); // Extract 'courseId' from the end of the URL

  // Fetching course data from the backend when the component is mounted
  useEffect(() => {
    fetch(`http://localhost/backend/api/course-details.php?id=${courseId}`) // Using the ID in the API URL
      .then((response) => response.json())
      .then((data) => {
        // Map the backend data to the UI structure
        const transformedCourse = {
          title: data.course_name || 'Untitled Course', // Handle if course_name is missing
          instructorName: data.course_instructor || 'Instructor Unavailable', // Handle if course_instructor is null
          duration: data.course_duration ? `${data.course_duration} weeks` : 'Duration unavailable', // Append 'weeks' if duration exists
          description: data.course_description || 'Course description is unavailable', // Handle if course_description is missing
          imageUrl: data.imageUrl || 'default-image-url', // Fallback if imageUrl is missing
          contentLink: data.contentLink || '/content', // Fallback if contentLink is missing
        };
        setCourse(transformedCourse);  // Update the state with the fetched data
      })
      .catch((error) => console.error('Error fetching course details:', error));
  }, [courseId]);

  const handleEnrollClick = () => {
    if (course) {
      alert(`You have enrolled in the course: ${course.title}`);
      window.location.href = course.contentLink; // Use dynamic content link
    }
  };

  return (
    <div className="course-info-small">
      {course ? (
        <div className="course-card">
          <img src={course.imageUrl} alt={course.title} className="course-image" />
          <h1>{course.title}</h1>
          <p><strong>Instructor:</strong> {course.instructorName}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p>{course.description}</p>
          <button onClick={handleEnrollClick}>Enroll Now</button>
        </div>
      ) : (
        <p>Loading course details...</p> // Display a loading message while data is being fetched
      )}
    </div>
  );
};

export default CourseInfoSmall;
