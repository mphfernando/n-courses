import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css';

const UserDashboard = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [contentLink, setContentLink] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const [courseCategory, setCourseCategory] = useState(''); // New state for course category
  const [courses, setCourses] = useState([]); // State for storing courses
  const userId = localStorage.getItem('userId'); // Assuming user_id is stored in local storage

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost/backend/api/fetch-courses.php?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data); // Set fetched courses
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (userId) { // Fetch courses only if userId is available
      fetchCourses();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate input
    if (!courseName || !courseDescription || !courseDuration || !contentLink || !imageUrl || !courseCategory) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/add-course.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Set course_instructor to the current user ID
          courseName,
          courseDescription,
          courseDuration,
          contentLink,
          imageUrl,
          courseCategory,
        }),
      });

      if (response.ok) {
        alert('Course added successfully!');
        const newCourse = {
          course_name: courseName,
          course_description: courseDescription,
          course_duration: courseDuration,
          contentLink,
          imageUrl,
          category: courseCategory,
        };
        setCourses([...courses, newCourse]); // Update state to include new course
        // Clear form fields after successful submission
        setCourseName('');
        setCourseDescription('');
        setCourseDuration('');
        setContentLink('');
        setImageUrl('');
        setCourseCategory('');
      } else {
        console.error('Failed to add course');
        alert('Error adding course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleDelete = async (courseId) => {
    console.log('Deleting course with ID:', courseId); // Log the course ID
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return; // Exit if not confirmed
  
    try {
      const response = await fetch(`http://localhost/backend/api/delete-course.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: courseId }),
      });
  
      console.log('Delete response:', response); // Log the response
      if (response.ok) {
        alert('Course deleted successfully!');
        setCourses(courses.filter((course) => course.course_id !== courseId));
      } else {
        console.error('Failed to delete course:', response.status, await response.text()); // Log additional error info
        alert('Error deleting course. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  

  return (
    <div className="user-dashboard">
      <h1>Your Dashboard</h1>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDuration">Course Duration:</label>
          <input
            type="text"
            id="courseDuration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contentLink">Content Link:</label>
          <input
            type="text"
            id="contentLink"
            value={contentLink}
            onChange={(e) => setContentLink(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseCategory">Course Category:</label>
          <select
            id="courseCategory"
            value={courseCategory}
            onChange={(e) => setCourseCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="1">Art</option>
            <option value="2">Tech</option>
            <option value="3">Commerce</option>
            <option value="4">AI</option>
          </select>
        </div>

        <button type="submit" className="add-course-button">Add Course</button>
      </form>

      <div className='spacer'></div>
      <h2>Enrolled Courses</h2>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Enrolled Students</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td>{course.course_name}</td>
                <td>{course.course_description}</td>
                <td>{course.enrolledStudentAmount}</td>
                <td>
      <button 
        className="delete-button"
        onClick={() => handleDelete(course.course_id)} // Ensure course_id is correct
      >
        Delete
      </button>
    </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No courses available</td> {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>
      <div className='spacer'></div>
    </div>
  );
};

export default UserDashboard;
