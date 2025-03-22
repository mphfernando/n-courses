import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to N-Courses, where we empower learners worldwide with quality online education. Our mission is to provide a platform that makes learning accessible and enjoyable for everyone. 
      </p>
      <p>
        Our team of experienced instructors and industry professionals is dedicated to delivering high-quality courses that cater to diverse learning needs. Whether you are looking to develop new skills, enhance your knowledge, or explore new interests, we have something for you.
      </p>
      <p>
        Join us on a journey of continuous learning and growth. Explore our wide range of courses and discover how we can help you achieve your educational goals.
      </p>
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <h3>John Doe</h3>
          <p>Founder & CEO</p>
          <p>Passionate about education and technology.</p>
        </div>
        <div className="team-member">
          <h3>Jane Smith</h3> 
          <p>Head of Curriculum Development</p>
          <p>Expert in instructional design and pedagogy.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
