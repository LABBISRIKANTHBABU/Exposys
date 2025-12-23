import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left', 
  disabled = false, 
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  as = 'button',
  href,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
    ghost: 'bg-transparent text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
    link: 'bg-transparent text-orange-600 hover:text-orange-800 focus:ring-orange-500 underline'
  };
  
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${widthClass} ${className}`;
  
  const renderIcon = () => icon && (
    <span className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}>
      {icon}
    </span>
  );
  
  const Element = as === 'link' ? 'a' : as;
  
  const elementProps = {
    className: classes,
    onClick,
    ...props
  };
  
  if (as === 'button') {
    elementProps.type = type;
    elementProps.disabled = disabled;
  } else if (as === 'link') {
    elementProps.href = href;
  }
  
  return (
    <Element {...elementProps}>
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </Element>
  );
};

export default Button;