import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
          selectedCategory === '' 
            ? 'bg-orange-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Categories
      </button>
      
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
            selectedCategory === category 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;