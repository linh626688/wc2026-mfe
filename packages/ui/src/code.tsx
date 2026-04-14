import * as React from "react";
import "./design-system.css";

export function Code({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return <code className={`notion-code ${className}`}>{children}</code>;
}
