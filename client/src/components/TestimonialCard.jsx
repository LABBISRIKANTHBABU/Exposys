import React from 'react';
import Image from './Image';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card h-full p-8 relative overflow-hidden group hover:border-brand-200 transition-colors">
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 right-4 text-brand-50 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
        <Quote size={80} fill="currentColor" strokeWidth={0} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src={testimonial.avatar || '/images/default-avatar.png'}
              alt={testimonial.name}
              className="w-full h-full"
              aspectRatio="1/1"
              objectFit="cover"
              fallback="/images/default-avatar.png"
            />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 font-heading">{testimonial.name}</h4>
            <p className="text-brand-600 text-sm font-medium">{testimonial.role}</p>
          </div>
        </div>

        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < testimonial.rating ? "#f59e0b" : "transparent"}
              className={`${i < testimonial.rating ? 'text-yellow-500' : 'text-neutral-200'}`}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <p className="text-neutral-600 leading-loose italic flex-grow">"{testimonial.comment}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;