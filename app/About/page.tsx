"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import about from "../../public/about.jpg";
import { CarouselDemo } from "@/components/Carousal";
export default function About() {
  const router = useRouter();
  return (
    <div className="w-full h-auto bg-black ">
      <section className="py-24 relative mb-6">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-white mb-12 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Empowering Every Transaction to Build a More Connected
                  Financial Future.
                </h2>
                <p className="text-gray-500 mb-10 text-base font-normal leading-relaxed lg:text-start text-center">
                  Through collaboration, diverse perspectives and strengths come
                  together to create inclusive financial ecosystems where
                  everyone has the opportunity to thrive. This approach not only
                  drives individual empowerment and economic growth but also
                  strengthens the digital fabric of society — making trusted,
                  accessible payments a reality for all.
                </p>
              </div>
              <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                <span
                  onClick={() => router.push("/signin")}
                  className="px-1.5 text-white text-sm font-medium leading-6"
                >
                  Get Started
                </span>
              </button>
            </div>
            <Image
              width={440}
              height={220}
              className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
              src={about}
              alt="about Us image"
            />
          </div>
        </div>
      </section>
      <div className="w-full h-auto p-4 flex justify-center gap-2 md:flex-row flex-col text-center items-center">
        <div className="text-6xl text-white font-bold ">Check Out Our Work</div>
        <CarouselDemo />
      </div>
    </div>
  );
}


