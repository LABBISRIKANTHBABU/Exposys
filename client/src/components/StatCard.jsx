import React from 'react';

const StatCard = ({ stat }) => {
  return (
    <div className="card text-center p-8 hover:border-brand-200 transition-colors duration-300">
      <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm transform transition-transform group-hover:scale-110">
        {stat.icon}
      </div>
      <div className="text-4xl font-heading font-extrabold text-neutral-900 mb-2 tracking-tight">{stat.value}</div>
      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide">{stat.label}</h3>
    </div>
  );
};

export default StatCard;