import React from 'react';
import CourseCard from './CourseCard';
import './Coursegrd.css';

const CourseGrid = ({ courses, title }) => (
    <div className="course-grid-container">
      <h2 className="grid-title">{title}</h2> {/* Use the dynamic title */}
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
  

export default CourseGrid;
