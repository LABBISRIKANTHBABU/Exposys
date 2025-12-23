import React, { useState } from 'react';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 bg-white rounded-lg">
          <div className="text-gray-600">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      if (openItems.includes(index)) {
        setOpenItems(openItems.filter(item => item !== index));
      } else {
        setOpenItems([...openItems, index]);
      }
    } else {
      setOpenItems(openItems.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.includes(index)}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;