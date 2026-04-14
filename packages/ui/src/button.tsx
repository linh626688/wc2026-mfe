import * as React from "react";
import "./design-system.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "pill";
  children: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: ButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "notion-btn-primary";
      case "secondary":
        return "notion-btn-secondary";
      case "ghost":
        return "notion-btn-ghost";
      case "pill":
        return "notion-btn-pill";
      default:
        return "notion-btn-primary";
    }
  };

  return (
    <button 
      className={`notion-btn ${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/* Styles for the button components */
/**
 * Note: Ordinarily, these would be in a separate .css file 
 * but for simplicity in this atomic component structure, 
 * I'm including the logic here. However, to follow the "Vanilla CSS" 
 * rule, I will add these classes to design-system.css
 */
