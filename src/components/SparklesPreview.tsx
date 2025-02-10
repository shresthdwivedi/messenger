"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

export function SparklesPreview({
  children,
}: {
  children: React.ReactNode,
}) {
    return (
      <div className="h-screen relative w-screen bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={2.5}
            maxSize={3.5}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#6441a5"
          />
        </div>
        <div className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          {children}
        </div>
        <div className="absolute bottom-[500px] w-[20rem] h-[20rem] bg-black [mask-image:radial-gradient(50px_200px_at_top,transparent_50%,black)]"></div>

      </div>
    );
  }



