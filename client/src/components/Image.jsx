import React, { useState } from 'react';

/**
 * Responsive Image Component with fallback support
 * 
 * Props:
 * - src: Image source URL
 * - alt: Alternative text for accessibility
 * - className: Additional CSS classes
 * - fallback: Fallback image URL (default: '/images/default-burger.jpg')
 * - aspectRatio: Aspect ratio as string (e.g., '16/9', '4/3', '1/1')
 * - objectFit: How the image should fit ('cover', 'contain', 'fill', etc.)
 * - lazy: Enable lazy loading (default: true)
 * - onLoad: Callback when image loads successfully
 * - onError: Callback when image fails to load
 */
const Image = ({
  src,
  alt,
  className = '',
  fallback = '/images/default-burger.jpg',
  aspectRatio = null,
  objectFit = 'cover',
  lazy = true,
  onLoad,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    // Prevent infinite loop if fallback also fails
    if (imgSrc !== fallback && !hasError) {
      setImgSrc(fallback);
      setHasError(true);
    } else {
      setIsLoading(false);
      if (onError) onError(e);
    }
  };

  // If aspectRatio is provided, use container with padding-bottom trick
  if (aspectRatio) {
    const [width, height] = aspectRatio.split('/').map(Number);
    const paddingBottom = (height / width) * 100;
    
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ paddingBottom: `${paddingBottom}%` }}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-${objectFit} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      </div>
    );
  }

  // Standard image without fixed aspect ratio
  return (
    <>
      {isLoading && (
        <div className={`bg-gray-100 animate-pulse flex items-center justify-center ${className}`}>
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0 absolute' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </>
  );
};

export default Image;