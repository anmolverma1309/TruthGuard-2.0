"use client";

import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="cur"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isPointer ? "var(--rose2)" : "var(--gold2)",
        }}
      />
      <div
        className="cur-ring"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? "48px" : "36px",
          height: isPointer ? "48px" : "36px",
          borderColor: isPointer ? "rgba(232,80,128,0.65)" : "rgba(240,192,96,0.65)",
        }}
      />
    </>
  );
};

export default CustomCursor;
