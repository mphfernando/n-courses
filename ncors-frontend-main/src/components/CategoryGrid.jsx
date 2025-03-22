// CategoryGrid.jsx
import React from 'react';
import './CategoryGrid.css'; // Ensure you have proper styling
import CategoryCard from './CategoryCard'; // Import the CategoryCard component

const CategoryGrid = ({ categories }) => {
  return (
    <div className="categories-grid">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
