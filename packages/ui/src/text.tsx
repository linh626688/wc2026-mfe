import * as React from "react";
import "./design-system.css";

interface TextProps {
  children: React.ReactNode;
  size?: "large" | "body" | "caption" | "badge";
  weight?: 400 | 500 | 600 | 700;
  className?: string;
  color?: "primary" | "secondary" | "muted" | "blue";
}

export const Text = ({
  children,
  size = "body",
  weight,
  className = "",
  color = "primary"
}: TextProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "large": return "text-body-large";
      case "body": return "text-body";
      case "caption": return "text-caption";
      case "badge": return "text-badge";
      default: return "text-body";
    }
  };

  const getColorClass = () => {
    switch (color) {
      case "primary": return "text-color-primary";
      case "secondary": return "text-color-secondary";
      case "muted": return "text-color-muted";
      case "blue": return "text-color-blue";
      default: return "text-color-primary";
    }
  };

  const style = weight ? { fontWeight: weight } : {};

  return (
    <p className={`${getSizeClass()} ${getColorClass()} ${className}`} style={style}>
      {children}
    </p>
  );
};
