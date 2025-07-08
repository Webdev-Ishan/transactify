"use client";

import { Carousel } from "@/components/ui/carousal";
export function CarouselDemo() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://media.istockphoto.com/id/1143910377/photo/trader-at-work.jpg?s=612x612&w=0&k=20&c=JdIDjG8Fgu-2DHzm-5WIkojO7Oa9-S5BPSPjcnp2N9Y=",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://media.istockphoto.com/id/1630663973/photo/woman-hand-holding-virtual-global-internet-connection-metaverse-business-global-internet.jpg?s=612x612&w=0&k=20&c=uT3exMBlXQi37GvX-hANO9eJA2eqRtjrbqCtEOJ1VRE=",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://media.istockphoto.com/id/1461343540/photo/happy-bank-manager-shaking-hands-with-a-client-after-successful-agreement-in-the-office.jpg?s=612x612&w=0&k=20&c=WaKSQ3HEo_rGP1pVU4H1Ri3SKLyhBgdry3cffut12ts=",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://media.istockphoto.com/id/1172767797/photo/indian-five-hundred-rupee-notes-in-a-sack-cloth.jpg?s=612x612&w=0&k=20&c=dwsLwmZAlcfFRw6FEpcehM4jVbZlXDv6p9P9BkY7zmQ=",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
