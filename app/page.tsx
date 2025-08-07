"use client";
import { TextGenerateEffectUse } from "@/components/TextEffect";
import { useRouter } from "next/navigation";
import { ColourfulTextDemo } from "@/components/colortext";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteCrds";
import dynamic from "next/dynamic";

const BackgroundBeam = dynamic(() => import("@/components/BackgroundBeam"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-auto pt-12 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="absolute inset-0 mt-16 -z-10 bg-black h-auto">
        <BackgroundBeam />
      </div>

      <TextGenerateEffectUse />
      <button
        onClick={() => router.push("/register")}
        className="px-4 py-2 m-8 rounded-full border-2 hover:border-white  bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
      >
        Get Started
      </button>

      <ColourfulTextDemo />

      <div className="w-full h-auto  mt-8 flex justify-center items-center p-4">
        <h1 className="text-5xl  font-bold text-white ml-8">
          Meet Our Customers
        </h1>
      </div>
      <InfiniteMovingCardsDemo />
      <h2 className="text-4xl font-bold text-center text-white mb-24">
        Why Choose Transactify?
      </h2>
      <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-white">
        <div className="p-6 mb-6 bg-white text-black rounded-2xl shadow-md  border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Fast Transactions</h3>
          <p>
            Experience lightning-fast{" "}
            <span className="text-blue-600 font-bold">UPI-Payments</span> with{" "}
            <span className="text-blue-600 font-bold">zero-delays</span> and
            top-notch reliability.
          </p>
        </div>
        <div className="p-6 mb-6 bg-white text-black rounded-2xl shadow-md  border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p>
            Built with robust{" "}
            <span className="text-blue-600 font-bold">authentication</span> and{" "}
            <span className="text-blue-600 font-bold">encrypted</span> data
            transfer for complete peace of mind.
          </p>
        </div>
        <div className="p-6 mb-6 bg-white text-black rounded-2xl shadow-md  border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Modern UI/UX</h3>
          <p>
            A sleek, responsive interface designed for simplicity and{" "}
            <span className="text-blue-600 font-bold">elegence </span>
            on all devices.
          </p>
        </div>
        <div className="p-6 bg-white text-black rounded-2xl shadow-md  border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p>
            Our <span className="text-blue-600 font-bold">support</span> team is
            always ready to help you with any issue, big or small.
          </p>
        </div>
        <div className="p-6 bg-white text-black rounded-2xl shadow-md  border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Custom Notifications</h3>
          <p>
            <span className="text-blue-600 font-bold">Real-time</span> alerts to
            keep you updated on every activity across your account.
          </p>
        </div>
        <div className="p-6 bg-white text-black rounded-2xl shadow-md border-2 hover:scale-105 hover:border-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Built for India</h3>
          <p>
            Tailored for the Indian market with{" "}
            <span className="text-blue-600 font-bold">UPI-first</span> features
            and regional optimizations.
          </p>
        </div>
      </div>
    </div>
  );
}
