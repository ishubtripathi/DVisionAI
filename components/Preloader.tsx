"use client";

import Image from "next/image";
import logo from "@/public/logo/logo1.svg";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        {/* Animated Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 animate-logo-spin">
          <Image
            src={logo}
            alt="DVisionAI Logo"
            className="w-full h-full object-contain select-none"
            draggable={false}
          />
        </div>
        <p className="text-white text-sm sm:text-base tracking-widest animate-pulse uppercase">
          loading...
        </p>
      </div>
    </div>
  );
}
