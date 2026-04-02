import React from 'react';

const LevelBadge = ({ level, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-lg',
    large: 'w-16 h-16 text-xl',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`relative ${sizeClass}`}>
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full blur-sm opacity-50"></div>
      
      {/* Main badge */}
      <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-lg">
        <span className="text-white font-bold drop-shadow-md">Lv{level}</span>
      </div>
      
      {/* Inner shine */}
      <div className="absolute top-1 left-1 right-1 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-full"></div>
      
      {/* Notches */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
    </div>
  );
};

export default LevelBadge;