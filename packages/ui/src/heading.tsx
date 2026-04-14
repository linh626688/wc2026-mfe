import * as React from "react";
import "./design-system.css";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "hero" | "display" | "section" | "sub-large" | "sub" | "card";
  className?: string;
}

export const Heading = ({
  children,
  level = 1,
  size = "section",
  className = ""
}: HeadingProps) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const getSizeClass = () => {
    switch (size) {
      case "hero": return "heading-display-hero";
      case "display": return "heading-display-secondary";
      case "section": return "heading-section";
      case "sub-large": return "heading-sub-large";
      case "sub": return "heading-sub";
      case "card": return "heading-card";
      default: return "heading-section";
    }
  };

  return (
    <Tag className={`${getSizeClass()} ${className}`}>
      {children}
    </Tag>
  );
};
