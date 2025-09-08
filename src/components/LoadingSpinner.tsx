import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "AI sedang menyusun RPPM, mohon tunggu sebentar..." 
}) => {
  return (
    <div className="text-center py-8">
      <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};