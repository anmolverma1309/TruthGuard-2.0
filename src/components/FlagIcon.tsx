import React from 'react';

export default function FlagIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative ${className} group`}>
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-white/30 to-green-500/30 blur-xl rounded-full opacity-100 transition-opacity duration-300" />
      
      <svg 
        viewBox="0 0 900 600" 
        className="w-full h-full rounded-md shadow-lg border border-white/10 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="900" height="200" fill="#FF9933"/>
        <rect y="200" width="900" height="200" fill="#FFFFFF"/>
        <rect y="400" width="900" height="200" fill="#138808"/>
        <g transform="translate(450,300)">
          <circle r="92.5" fill="none" stroke="#000080" strokeWidth="6"/>
          <circle r="16.5" fill="#000080"/>
          <g id="spoke">
            <line y1="-92.5" y2="-16.5" stroke="#000080" strokeWidth="6"/>
            <path d="M0-92.5c4,16.5 4,16.5 0,16.5-4,0-4,0 0-16.5z" fill="#000080"/>
          </g>
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 15})`}>
              <use href="#spoke"/>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
