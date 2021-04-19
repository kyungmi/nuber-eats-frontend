import React, { FC } from 'react';

interface ButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  canClick,
  loading,
  actionText,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`px-6 py-2 text-lg font-medium text-white transition-colors focus:outline-none ${
        canClick
          ? 'bg-lime-500 hover:bg-lime-600'
          : 'bg-gray-300 hover:bg-gray-300'
      } ${className}`}
      disabled={loading || !canClick}
      {...props}
    >
      {loading ? 'Loading...' : actionText}
    </button>
  );
};
