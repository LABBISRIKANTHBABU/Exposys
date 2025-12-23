import React, { useState } from 'react';

const Rating = ({ 
  initialRating = 0, 
  readonly = false, 
  onRatingChange,
  size = 'md',
  showLabel = false
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleClick = (value) => {
    if (readonly) return;
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (readonly) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const getStarClass = (index) => {
    const currentRating = hoverRating || rating;
    if (index <= currentRating) {
      return 'text-yellow-400 fill-current';
    }
    return 'text-gray-300';
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`${readonly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
        onClick={() => handleClick(star)}
        onMouseEnter={() => handleMouseEnter(star)}
        onMouseLeave={handleMouseLeave}
        disabled={readonly}
        aria-label={`Rate ${star} out of 5`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`${sizeClasses[size]} ${getStarClass(star)}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  const getLabel = () => {
    if (!showLabel) return null;
    
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    
    const currentRating = hoverRating || rating;
    return labels[currentRating] || '';
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {renderStars()}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {getLabel()}
        </span>
      )}
    </div>
  );
};

export default Rating;