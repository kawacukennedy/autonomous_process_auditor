// LoadingSkeleton component for better UX during loading
import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;