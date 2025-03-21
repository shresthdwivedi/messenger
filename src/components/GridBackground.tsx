"use client";

import React from "react";

const GridBackground = ({
    children,
}: {
    children: React.ReactNode,
}) => {
  return (
    <div className="h-screen w-screen bg-black  bg-grid-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
    </div>
  );
}

export default GridBackground;
