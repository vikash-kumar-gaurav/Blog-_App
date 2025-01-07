import React, { useState, useEffect } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 50); // Increases by 1% every 50ms
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [progress]);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="relative w-80 h-80 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        {/* Circle Progress Bar */}
        <div className="w-full h-64 flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              className="stroke-gray-300"
              cx="50"
              cy="50"
              r="45"
              strokeWidth="10"
              fill="none"
            />
            <circle
              className="stroke-indigo-600"
              cx="50"
              cy="50"
              r="45"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              strokeLinecap="round"
              className="transition-all duration-2000"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-800">Please wait...</p>
        <p className="text-gray-500 text-sm">{progress}% Completed</p>
      </div>
    </div>
  );
}
