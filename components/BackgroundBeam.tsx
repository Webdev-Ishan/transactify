"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beam";

 function BackgroundBeam() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-transparent relative flex flex-col items-center justify-center antialiased">
     
      <BackgroundBeams />
    </div>
  );
}
export default BackgroundBeam