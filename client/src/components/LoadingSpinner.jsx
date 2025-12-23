import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'orange' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    orange: 'border-orange-500 border-t-orange-500',
    blue: 'border-blue-500 border-t-blue-500',
    green: 'border-green-500 border-t-green-500',
    red: 'border-red-500 border-t-red-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-spin rounded-full border-4 border-solid border-opacity-25 ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ borderTopColor: 'currentColor' }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;