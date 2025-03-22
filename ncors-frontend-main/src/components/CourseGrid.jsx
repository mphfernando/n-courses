import React from 'react';
import CourseCard from './CourseCard';
import './CourseGrid.css';

const CourseGrid = ({ courses, title, onEnroll }) => (
  <div className="course-grid-container">
    <h2 className="grid-title">{title}</h2> {/* Use the dynamic title */}
    <div className="course-grid">
    {courses.map(course => (
          <CourseCard key={course.id} course={course} onEnroll={onEnroll} /> // Pass the onEnroll function
        ))}
    </div>
  </div>
);

export default CourseGrid;
