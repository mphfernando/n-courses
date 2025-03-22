import React from 'react';
import { Link } from 'react-router-dom';
import './Coursecrd.css';

const CourseCard = ({ course }) => (
  <Link to={course.contentLink} className="course-card">
    <div className="image-container">
      <img src={course.imageUrl} alt={course.title} className="course-image" />
      <div className="image-overlay"></div>
    </div>
    <div className="course-info">
      <h3 className="title">{course.course_name}</h3> {/* Course Name */}
      <p className="provider"> <b>Instructor:</b> {course.course_instructor}</p> {/* Instructor Name */}
      <p className="duration"><b>Duration</b> {course.course_duration}</p> {/* Course Duration */}
      <p className="enrollment-date">
    <b>Enrolled on: </b>{new Date(course.enrollment_date).toLocaleDateString()}
</p>

      
      <Link to={course.contentLink}>
        <button className="enroll-btn">Continue</button>
      </Link>
    </div>
  </Link>
);

export default CourseCard;
