import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './LoginForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons from react-icons

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError(''); // Clear any previous error messages

    try {
      const response = await fetch('http://localhost/backend/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // Parse JSON response

      // Check if the login was successful
      if (result.message === 'success') {
        alert("Login successful! Redirecting to the dashboard..."); // Notify user of success
        
        // Store the user ID in local storage
        localStorage.setItem('userId', result.user_id); 
        sessionStorage.setItem('role', result.role); 

        history.push('/dashboard'); // Redirect to the dashboard
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to log in');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="../../assets/a.jpg" alt="Login" />
      </div>
      <div className="login-form-wrapper">
        <div className="login-form-content">
          <h1>Welcome Student</h1>
          <p className="subtitle">Log in to your N-Courses account</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                id="password"
                className="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
              </button>
            </div>
            <button type="submit" className="login-button">Log in</button>
          </form>
          <div className="login-options">
            <a href="#forgot-password" className="forgot-password">Forgot password?</a>
            <p className="register-link">
              Don't have an account? <a href="/Register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
