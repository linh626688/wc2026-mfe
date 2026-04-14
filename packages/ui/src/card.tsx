import * as React from "react";
import "./design-system.css";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: "standard" | "featured";
}

export const Card = ({
  children,
  title,
  className = "",
  variant = "standard"
}: CardProps) => {
  const variantClass = variant === "featured" ? "notion-card-featured" : "notion-card-standard";

  return (
    <div className={`notion-card ${variantClass} ${className}`}>
      {title && <h3 className="heading-card notion-card-title">{title}</h3>}
      <div className="notion-card-content">
        {children}
      </div>
    </div>
  );
};
