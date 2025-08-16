"use client";

import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export default function Logo({ className, size = "sm" }: LogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-2xl";
      case "md":
        return "text-3xl";
      case "lg":
        return "text-5xl sm:text-5xl";
      case "xl":
        return "text-6xl sm:text-6xl";
      case "2xl":
        return "text-7xl sm:text-7xl";
      case "3xl":
        return "text-8xl sm:text-8xl";
      default:
        return "text-5xl sm:text-5xl";
    }
  };

  return (
    <h1
      className={`${className} ${getSizeClasses()} inline-block align-middle font-extrabold tracking-tight`}
    >
      <span className="text-purple-600 dark:text-purple-400">AI</span>
      <span className="ml-2 text-white dark:text-white">Music Generator</span>
    </h1>
  );
}
