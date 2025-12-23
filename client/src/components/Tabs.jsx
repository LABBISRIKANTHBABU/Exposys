import React, { useState } from 'react';

const Tab = ({ id, label, isActive, onClick, disabled = false }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(id);
    }
  };

  return (
    <button
      className={`px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none transition-colors duration-200 ${
        isActive
          ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-selected={isActive}
      role="tab"
    >
      {label}
    </button>
  );
};

const TabPanel = ({ id, activeTab, children }) => {
  if (id !== activeTab) return null;

  return (
    <div 
      className="p-4 bg-white rounded-b-lg rounded-tr-lg"
      role="tabpanel"
    >
      {children}
    </div>
  );
};

const Tabs = ({ tabs, defaultActiveTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className="w-full">
      <div 
        className="flex border-b border-gray-200 bg-gray-50 rounded-t-lg"
        role="tablist"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={handleTabClick}
            disabled={tab.disabled}
          />
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <TabPanel
            key={tab.id}
            id={tab.id}
            activeTab={activeTab}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default Tabs;