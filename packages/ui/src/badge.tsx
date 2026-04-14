import * as React from "react";
import "./design-system.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "teal" | "green" | "orange" | "pink" | "purple";
  className?: string;
}

export const Badge = ({
  children,
  variant = "blue",
  className = ""
}: BadgeProps) => {
  return (
    <span className={`notion-badge notion-badge-${variant} ${className}`}>
      {children}
    </span>
  );
};
