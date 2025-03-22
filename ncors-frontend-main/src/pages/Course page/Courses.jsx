import React, { useEffect, useState, useCallback } from 'react';
import CourseGrid from '../../components/CourseGrid'; // Import the reusable CourseGrid component

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem('userId');

  // useCallback to memoize the handleEnroll function
  const handleEnroll = useCallback(async (courseId) => {
    if (!userId) {
      alert('User not logged in. Please log in to enroll in courses.');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/enroll.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
      });

      if (!response.ok) {
        throw new Error('Enrollment response was not ok: ' + response.statusText);
      }

      const data = await response.json();
      if (data.error) {
        console.error('Enrollment failed:', data.error);
        alert(data.error);
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Enrollment failed. Please try again later.');
    }
  }, [userId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost/backend/api/courses.php'); 
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const transformedCourses = data.map((course) => ({
          id: course.id,
          imageUrl: course.imageUrl,
          provider: course.ins_user_name,
          title: course.course_name,
          type: course.course_description,
          contentLink: `/courseinfo/${course.id}`, // Link to course info
        }));
        setCourses(transformedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to load courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []); 

  return <CourseGrid courses={courses} title="All Courses" onEnroll={handleEnroll} />; // Pass handleEnroll as onEnroll
};

export default CoursePage;
