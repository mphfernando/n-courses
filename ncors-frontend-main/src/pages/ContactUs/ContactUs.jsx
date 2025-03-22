import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8081/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      }
    }
  };

  return (
    <div className="contact-us max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Contact Us</h1>
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Thank you for contacting us!</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>An error occurred. Please try again later.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="contact-form space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'error border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <span className="error-message text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'error border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <span className="error-message text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="block mb-1">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.message ? 'error border-red-500' : 'border-gray-300'}`}
            rows="4"
          />
          {errors.message && <span className="error-message text-red-500 text-sm">{errors.message}</span>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
      <div className="contact-info mt-8">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p>Email: support@n-courses.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default ContactUs;