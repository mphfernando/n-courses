import React, { useEffect, useState } from 'react';
import CourseGrid from './CourseGrid.jsx';
import './UserDashboard.css';

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role")); 
  const [userProfile, setUserProfile] = useState({
    profilePic: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Rilley_elf_south_park_avatar.png?20100219121222', // Default profile picture URL
    name: '', // User's name
    email: '', // User's email
  });
  const userId = localStorage.getItem('userId'); 


  useEffect(() => {
    
    const fetchUserDetails = async () => {
      if (!userId) {
        console.error('User ID not found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`http://localhost/backend/api/detailsprofile.php?id=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
         
          setUserProfile((prevProfile) => ({
            ...prevProfile,
            name: data.first_name, 
            email: data.email, 
          }));
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Depend on userId

  useEffect(() => {
    // Fetch enrolled courses from the backend
    const fetchEnrolledCourses = async () => {
      if (!userId) {
        console.error('User ID not found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`http://localhost/backend/api/enrolled-courses.php?id=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        // Log the response status
        console.log('Response Status:', response.status);

        if (response.ok) {
          const data = await response.json();
          // Log the actual data received
          console.log('Enrolled Courses Data:', data);
          setEnrolledCourses(data);
        } else {
          console.error('Failed to fetch enrolled courses');
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [userId]); // Depend on userId

  return (
    <div className="user-dashboard">
      <h1>Your Dashboard</h1>

      {/* Conditionally Render Profile Card for Students Only */}
      {userRole === 'student' && (
        <div className="profile-card">
          <img src={userProfile.profilePic} alt={`${userProfile.name}'s Profile`} className="profile-pic" />
          <h2 className="profile-name">{userProfile.name || 'Loading...'}</h2>
          <p className="profile-email">{userProfile.email || 'Loading...'}</p>
        </div>
      )}

      {enrolledCourses.length > 0 ? (
        <CourseGrid courses={enrolledCourses} title="Enrolled Courses" />
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default UserDashboard;
