"use client";

import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: "blue" | "purple" | "green" | "white";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    color = "blue",
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    const colorClasses = {
        blue: "border-blue-500",
        purple: "border-purple-500",
        green: "border-green-500",
        white: "border-white",
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
