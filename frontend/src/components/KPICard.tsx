import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && <p className="text-green-500 text-sm">{change}</p>}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
};

export default KPICard;