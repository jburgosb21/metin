import React from 'react';

const StatBar = ({ label, current, max, color, icon, className = '' }) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    'metin-hp': 'bg-red-600',
    'metin-exp': 'bg-green-600',
    'metin-gold': 'bg-yellow-600',
    'metin-primary': 'bg-purple-600',
    'metin-secondary': 'bg-emerald-600',
  };

  const barColor = colorClasses[color] || 'bg-blue-600';

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-mono">
          {current}/{max}
        </span>
      </div>
      <div className="h-4 bg-gray-800 rounded-full overflow-hidden stat-bar">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-400 text-right">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

export default StatBar;