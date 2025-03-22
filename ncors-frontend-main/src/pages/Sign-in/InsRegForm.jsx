import React, { useState } from 'react';
import './InsRegForm.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const InstructorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gmail: '',
    password: '',
    confirmPassword: '',
    linkedInUrl: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling instructor registration form submission
    try {
      const response = await fetch('http://localhost/backend/api/register_teacher.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
       alert("Registration Successful");
        console.log('Registration Successful:', result);
        window.location.href = '/login';
      } else {
        alert("Registration failed");
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {

      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-wrapper">
        <h1>Become an Instructor</h1>
        <p className="subtitle">Teach on N-Courses</p>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gmail">Gmail</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
              placeholder="Enter your Gmail"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Re-type Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-type your password"
            />
            <button
              type="button"
              className="show-password-toggle"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="linkedInUrl">LinkedIn URL</label>
            <input
              type="url"
              id="linkedInUrl"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
              required
              placeholder="Enter your LinkedIn profile URL"
            />
          </div>

          <button type="submit" className="register-button">
            Register as Instructor
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorRegistrationForm;
