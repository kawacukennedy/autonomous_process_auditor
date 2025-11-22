// KPICard component for displaying key performance indicators
import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
          {change && <p className="text-green-600 dark:text-green-400 text-sm font-medium">{change}</p>}
        </div>
        {icon && <div className="text-4xl opacity-80">{icon}</div>}
      </div>
    </div>
  );
};

export default KPICard;