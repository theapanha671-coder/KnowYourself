import React from "react";

export default function Card({ children, className = "", hover = true, ...props }) {
  const cls = ["card", hover ? "hover-lift" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
