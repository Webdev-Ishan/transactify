"use client";
import React from "react";
import { ColourfulText } from "@/components/ui/colourful-text";
import { motion } from "motion/react";

export function ColourfulTextDemo() {
  return (
    <div className="h-screen overflow-x-hidden mt-10 text-center w-full flex items-center justify-center relative bg-black">
      <motion.img
        src="https://images.pexels.com/photos/34577/pexels-photo.jpg?cs=srgb&dl=pexels-negativespace-34577.jpg&fm=jpg"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        The Safest <ColourfulText text="transactions" /> <br /> you will ever
        do.
      </h1>
    </div>
  );
}
