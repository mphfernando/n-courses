// CategoryCard.jsx
import React from 'react';
import './CategoryCard.css'; // Ensure you style the category card

const CategoryCard = ({ category }) => (
  <div className="category-card">
    <img src={category.img} alt={category.name} /> {/* Ensure img_url is the correct field in your DB */}
    <h3>{category.name}</h3>
  </div>
);

export default CategoryCard;
