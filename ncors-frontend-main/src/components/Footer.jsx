import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Function to get page links based on the page name
  const getPageLink = (page) => {
    switch (page) {
      case 'Home':
        return '/'; // Home page
      case 'Courses':
        return '/courses'; // Courses page
      case 'About Us':
        return '/about'; // About Us page+
      case 'Contact':
        return '/contact'; // Contact page
      default:
        return '/'; // Default to home for any unknown pages
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-branding">
            <div className="logo-container">
              <img src="../assets/Course.png" alt='logo' className="logo" />
              <span className="company-name">N-Courses</span>
            </div>
            <p className="company-description">
              Empowering learners worldwide with quality online education. Join us on a journey of continuous learning and growth.
            </p>
          </div>
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              {['Home', 'Courses', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={getPageLink(item)} className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="social-icons">
              {[ 
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="social-icon">
                  <Icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">&copy; 2024 N-Courses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
