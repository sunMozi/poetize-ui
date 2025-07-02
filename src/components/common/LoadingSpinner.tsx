import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: number; // 尺寸，单位 px，默认 40
  color?: string; // 颜色，默认 text-gray-400
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '加载中...',
  size = 40,
  color = 'text-gray-400',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <svg
        className={`animate-spin ${color}`}
        style={{ width: size, height: size }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className={`mt-2 text-sm font-medium ${color}`}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
