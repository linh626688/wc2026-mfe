import * as React from "react";
import "./design-system.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = ({ label, className = "", ...props }: InputProps) => {
  return (
    <div className={`notion-input-container ${className}`}>
      {label && <label className="text-caption text-color-secondary notion-input-label">{label}</label>}
      <input
        className="notion-input"
        {...props}
      />
    </div>
  );
};
