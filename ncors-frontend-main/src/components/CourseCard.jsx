import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, onEnroll }) => {
  const handleEnrollClick = (e) => {
    e.preventDefault(); // Prevent the default Link behavior
    if (onEnroll) {
      onEnroll(course.id);
     // Call the onEnroll function with the course ID
    } else {
      alert(`No enrollment function provided.`);
    }
  };

  // Assuming user role is stored in session storage
  const userRole = sessionStorage.getItem('role'); // Use sessionStorage for role

  return (
    <div className="course-card">
      <Link to={course.contentLink} className="image-container">
        <img src={course.imageUrl} alt={course.title} className="course-image" />
        <div className="image-overlay"></div>
      </Link>
      <div className="course-info">
        <p className="provider">{course.provider}</p>
        <h3 className="title">{course.title}</h3>
        <p className="type">{course.type}</p>
        
        {/* Show View Courses button for teachers */}
        {userRole === 'teacher' ? (
          <Link to="/content" className="view-courses-btn">View Courses</Link>
        ) : (
          <button className="enroll-btn" onClick={handleEnrollClick}>Enroll</button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
