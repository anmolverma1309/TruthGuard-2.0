"use client";

import FlagIcon from "./FlagIcon";

const BackgroundLayers: React.FC = () => {
  return (
    <div className="bg-tg">
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="bg-lines" />
      <div className="bg-vignette" />
      
      {/* Global Corner Flag */}
      <div className="fixed bottom-8 right-8 z-[100] pointer-events-none opacity-90 brightness-150 transition-opacity hidden md:block">
          <FlagIcon className="w-16 h-10 shadow-2xl skew-x-2" />
      </div>
    </div>
  );
};

export default BackgroundLayers;
