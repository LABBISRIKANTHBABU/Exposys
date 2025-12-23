# Image Handling Guide for Brrrgrrr Burger App

This guide explains how to properly handle PNG and SVG images in the Brrrgrrr Burger application to ensure they resize, display, and position correctly.

## Best Practices for Image Handling

### 1. Image Storage Locations

#### Public Images (Static Assets)
Place static images that don't need to be processed by the build system in:
```
/public/images/
```

These images can be referenced directly with:
```jsx
<img src="/images/your-image.png" alt="Description" />
```

#### Imported Images (Processed Assets)
Place images that should be processed by the build system (optimized, compressed) in:
```
/src/assets/
```

Import and use these images with:
```jsx
import yourImage from '../assets/your-image.png';

// In your component
<img src={yourImage} alt="Description" />
```

### 2. Proper Image Resizing

#### For Product Images and Photos (PNG/JPG)
Use the following responsive sizing classes:

```jsx
<img 
  src={imageSrc} 
  alt={altText}
  className="w-full h-56 object-cover" // Fixed height with cover fit
/>

<img 
  src={imageSrc} 
  alt={altText}
  className="w-full h-auto max-h-96 object-contain" // Responsive with height limit
/>
```

#### For Icons and Logos (SVG)
SVGs can be used inline for better control:

```jsx
// Inline SVG for icons
<svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

### 3. Responsive Image Implementation

Use these responsive image patterns:

```jsx
// Responsive with aspect ratio preservation
<div className="aspect-w-16 aspect-h-9">
  <img 
    src={imageSrc} 
    alt={altText}
    className="object-cover w-full h-full"
  />
</div>

// Flexible sizing with max dimensions
<img 
  src={imageSrc} 
  alt={altText}
  className="max-w-full h-auto max-h-80 object-contain"
/>

// Fixed dimensions with scaling
<img 
  src={imageSrc} 
  alt={altText}
  className="w-32 h-32 object-cover rounded-lg"
/>
```

### 4. Optimization Techniques

#### Lazy Loading
Add lazy loading for better performance:
```jsx
<img 
  src={imageSrc} 
  alt={altText}
  loading="lazy"
  className="w-full h-56 object-cover"
/>
```

#### Fallback Images
Always provide fallback images:
```jsx
<img 
  src={product.image || '/images/default-burger.jpg'} 
  alt={product.name} 
  className="w-full h-56 object-cover"
  onError={(e) => {
    e.target.src = '/images/default-burger.jpg';
  }}
/>
```

### 5. SVG Handling

#### Inline SVG Components
For icons and small graphics, create reusable components:

```jsx
const BurgerIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

// Usage
<BurgerIcon className="h-8 w-8 text-orange-600" />
```

#### External SVG Files
Import and use external SVG files:
```jsx
import Logo from '../assets/logo.svg';

<img src={Logo} alt="Brrrgrrr Logo" className="h-12 w-auto" />
```

### 6. Image Component Pattern

Create a reusable image component for consistent handling:

```jsx
const ResponsiveImage = ({ 
  src, 
  alt, 
  className = "", 
  fallback = "/images/placeholder.jpg",
  aspectRatio = "16/9",
  objectFit = "cover",
  lazy = true,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };
  
  return (
    <div className={`relative w-full`} style={{ aspectRatio }}>
      <img
        src={imgSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-${objectFit} ${className}`}
        onError={handleError}
        loading={lazy ? "lazy" : "eager"}
        {...props}
      />
    </div>
  );
};

// Usage
<ResponsiveImage 
  src={product.image} 
  alt={product.name} 
  aspectRatio="4/3"
  className="rounded-lg"
/>
```

### 7. Performance Tips

1. **Compress Images**: Use tools like TinyPNG or Squoosh to compress images before adding them to the project
2. **Choose Right Format**: 
   - Use JPG for photographs
   - Use PNG for graphics with transparency
   - Use SVG for logos and icons
3. **Specify Dimensions**: Always specify width and height to prevent layout shifts
4. **Use WebP**: Consider converting images to WebP format for better compression

### 8. Common Issues and Solutions

#### Issue: Images not loading
Solution: Check the file path and ensure the image exists in the correct directory

#### Issue: Images stretching
Solution: Use appropriate object-fit classes (`object-cover`, `object-contain`, `object-fill`)

#### Issue: Layout shifts
Solution: Specify dimensions with aspect ratios or fixed sizes

#### Issue: Large file sizes
Solution: Compress images and use appropriate formats

By following these guidelines, all images in the Brrrgrrr Burger app will resize, display, and position properly across all devices and screen sizes.