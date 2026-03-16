"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ReflectiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function ReflectiveButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ReflectiveButtonProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* 
        The webkit-box-reflect is handled via custom class in globals.css,
        but for max compatibility and control, we can also use pseudo-elements
        or Framer Motion for the glow.
        Here we implement the 'Bright != Clean' anatomy.
      */}
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="
          group relative flex items-center justify-center
          overflow-hidden rounded-md bg-[#0a0a0a] px-8 py-3
          font-bold uppercase tracking-widest text-white
          transition-all duration-300
          border border-[rgba(255,255,255,0.1)]
          hover:border-[#8effa6] hover:text-[#8effa6]
          hover:shadow-[0_0_20px_rgba(142,255,166,0.15)]
          active:shadow-none
        "
        style={{
          // Apple-style reflection below the button
          WebkitBoxReflect:
            "below 2px linear-gradient(transparent 60%, rgba(255,255,255,0.1))",
        }}
      >
        {/* Subtle gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(142,255,166,0.05)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    </div>
  );
}
