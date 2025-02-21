"use client";

import { GlowingEffect } from "./ui/glowing-effect";

interface GlowingBorderProps {
    area?: string;
    children: React.ReactNode;
  }
   
const GlowingBorder = ({ area, children }: GlowingBorderProps) => {
  return (
    <div className={`min-h-[14rem] items-center justify-center bg-black rounded-3xl`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full items-center justify-center gap-6 overflow-hidden rounded-xl border-1.75 p-6 shadow-[0px_0px_200px_10px_#2D2D2D] md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowingBorder;