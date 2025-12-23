import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import { ArrowRight, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="card group h-full flex flex-col hover:shadow-glow transition-all duration-500">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={product.image || '/images/default-burger.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          aspectRatio="4/3"
          objectFit="cover"
          fallback="/images/default-burger.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition duration-500"></div>

        {/* Price Tag Overlay */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg font-heading font-bold text-brand-600">${product.basePrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <h3 className="text-xl font-heading font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">{product.name}</h3>
        </div>

        <p className="text-neutral-500 mb-6 text-sm leading-relaxed flex-grow line-clamp-3">{product.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {product.ingredients && product.ingredients.slice(0, 3).map((ingredient, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium border border-neutral-200">
              {ingredient}
            </span>
          ))}
          {product.ingredients && product.ingredients.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-brand-50 text-brand-600 text-xs font-medium border border-brand-100">
              +{product.ingredients.length - 3} more
            </span>
          )}
        </div>

        <Link
          to={`/build?product=${product._id}`}
          className="btn btn-primary w-full group/btn justify-between"
        >
          <span>Customize Order</span>
          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;