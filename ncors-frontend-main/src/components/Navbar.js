import React, { useState } from "react";
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory for redirection

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory(); // Initialize useHistory
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role")); // Initialize user role from sessionStorage

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    
    // Update userRole state to trigger a re-render
    setUserRole(null);

    // Optionally redirect to home or login page after logout
    history.push('/'); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../assets/Course.png" alt='logo' />
        <h3><Link to="/">N-Courses</Link></h3>
      </div>
      <ul className="navbar-links">
        <li>
          <form className="search-bar-form">
            <input className="search-input" type="search" placeholder="Type to search..." />
            <button className="search-button" type="submit">Search</button>
          </form>
        </li>
        <li><Link to="/courses">All Courses</Link></li>
        <li className="dropdown">
          <a href="/" onFocus={handleDropdownToggle}>Categories</a>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="/category1">Mathematics</a>
              <a href="/category2">Business</a>
              <a href="/category3">Finance & Accounting</a>
              <a href="/category4">IT & Related Studies</a>
              <a href="/category5">Marketing</a>
              <a href="/category6">Design & Music</a>
            </div>
          )}
        </li>
        {userRole === "student" && (
          <>
            <li>
              <Link to="/dashboard">
                <button className="navbar-button">Dashboard</button>
              </Link>
            </li>
            <li>
              <button className="navbar-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {userRole === "teacher" && (
          <>
            <li>
              <Link to="/dashboard-teacher">
                <button className="navbar-button">Dashboard</button>
              </Link>
            </li>
            <li>
              <button className="navbar-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {!userRole && ( // Display buttons for login if the user is not logged in
          <>
            <li>
              <Link to="/login">
                <button className="navbar-button">Student</button>
              </Link>
            </li>
            <li>
              <Link to="/LoginForm_teacher">
                <button className="navbar-button">Teacher</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
