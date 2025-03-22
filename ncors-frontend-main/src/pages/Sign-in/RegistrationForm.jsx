import React, { useState } from 'react';
import './RegistrationForm.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    role: 'student',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    console.log('Form data:', formData);
    
    try {
      const response = await fetch('http://localhost/backend/api/register.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Parse JSON response
      if (response.ok) {
        alert("Registered and Redirect to /login"); // Alert on success
        window.location.href = '/login'; // Redirect to the login page
      } else {
        setErrorMessage(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to register');
    }
  };

  return (
    <div className="registration-container">
      <div className="form-wrapper">
        <h1>Register</h1>
        <p className="subtitle">on N-Courses</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName} // Corrected value binding
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
              value={formData.lastName} // Corrected value binding
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
            <label htmlFor="email">Gmail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email} // Corrected value binding
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
              {showPassword ? <FaEyeSlash/> : <FaEye />}
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

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
