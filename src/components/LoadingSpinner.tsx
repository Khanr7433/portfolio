"use client";

import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: "accent" | "blue" | "purple" | "green" | "white";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    color = "accent",
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    const colorClasses = {
        accent: "text-accent",
        blue: "text-blue-500", // Keep for compatibility but prefer accent
        purple: "text-purple-500",
        green: "text-green-500",
        white: "text-white",
    };

    return (
        <div className="flex items-center justify-center">
            <svg
                className={`${sizeClasses[size]} animate-spin ${
                    colorClasses[color as keyof typeof colorClasses] ||
                    colorClasses.accent
                }`}
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
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;
