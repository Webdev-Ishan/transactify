"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25em] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I’ve used a lot of online payment solutions, but Trasctify stands out. The interface is clean, and the transactions are lightning-fast. I made my first transfer in under a minute!",
    name: "Ravi Mehta",
    title: "Freelance Developer",
  },
  {
    quote:
      "Trasctify helped me streamline all my customer payments. No hidden charges, and the real-time tracking feature is a game-changer!",
    name: "Priya Nair",
    title: "Owner, Craftly Studio",
  },
  {
    quote:
      "Honestly, I didn’t expect a payment platform to look this good. It feels modern and intuitive. Trasctify makes managing finances feel less boring.",
    name: "Sahil Sharma",
    title: "UI/UX Designer",
  },
  {
    quote:
      "I’ve always been skeptical about online payments, but Trasctify’s security layers and OTP verifications are top-notch. I feel safe using it daily.",
    name: "Aarav Khanna",
    title: "College Student",
  },
  {
    quote:
      "Had a minor issue with a failed transaction, and their support team resolved it within 30 minutes. Super professional and quick.",
    name: "Tanisha Roy",
    title: "Digital Marketer",
  },
  {
    quote:
      "Sending money to my cousin in the UK was always a hassle, but with Trasctify, it just took a few clicks. No high fees or delays!",
    name: "Nikhil Deshmukh",
    title: "Engineer",
  },
  {
    quote:
      "Trasctify is fast, simple, and surprisingly powerful. It’s my go-to for both personal and business payments now.",
    name: "Meera Kulkarni",
    title: "Fitness Coach",
  },
];

