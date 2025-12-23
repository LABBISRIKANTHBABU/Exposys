import React, { useState } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const showTooltip = () => {
    const newTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(newTimer);
  };

  const hideTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip';
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2`;
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900';
      case 'right':
        return 'absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900';
      case 'bottom':
        return 'absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900';
      case 'left':
        return 'absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-900';
      default:
        return 'absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900';
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      
      {isVisible && (
        <div 
          className={`${getPositionClasses()} ${className}`}
          role="tooltip"
        >
          <div className={getArrowClasses()}></div>
          <span>{content}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;