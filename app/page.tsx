"use client"
import BackgroundBeam from "@/components/BackgroundBeam";
import { TextGenerateEffectUse } from "@/components/TextEffect";
import { useRouter } from "next/navigation";
import {ColourfulTextDemo} from "@/components/colortext"
import { InfiniteMovingCardsDemo } from "@/components/InfiniteCrds";
export default function Home() {
  const router = useRouter()
  return(
  <div className="w-full h-auto pt-12 pr-4 pl-4 flex justify-center items-center flex-col">
  <div className="fixed inset-0 -z-10 bg-black h-auto" >
<BackgroundBeam />

  </div>

  <TextGenerateEffectUse  />
<button onClick={()=>router.push("/register")} className="px-4 py-2 m-8 rounded-full border-2 hover:border-white  bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
  Get Started
</button>

<ColourfulTextDemo/>

<div className="w-full h-auto  mt-8 flex justify-center items-center p-4">
<h1 className="text-5xl font-bold text-white">Meet Our Customers</h1>
</div>
<InfiniteMovingCardsDemo />

  </div>
  
);
}
