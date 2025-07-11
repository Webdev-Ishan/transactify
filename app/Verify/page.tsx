"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

type RazorpayCheckoutResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    const senderId = searchParams.get("senderid");
    const receiverId = searchParams.get("receiverid");
    const amount = searchParams.get("amount");

    if (!orderId || !senderId || !receiverId || !amount) {
      console.error("Missing payment params in URL");
      return;
    }

    const openRazorpayCheckout = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: Number(amount) * 100, // in paise
        currency: "INR",
        name: "Transactify",
        description: "Payment Transfer",
        order_id: orderId,
        handler: async function (response: RazorpayCheckoutResponse) {
          try {
            const verifyRes = await axios.post("/api/Verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              senderId: Number(senderId),
              receiverId: Number(receiverId),
              amount: Number(amount),
            });

            if (verifyRes.data.success) {
              alert("✅ Transaction Successful!");
              // or any success page
            } else {
              alert("❌ Transaction Failed: " + verifyRes.data.message);
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error(error);
              alert("❌ Error verifying payment");
            }
          } finally {
            router.push("/Profile");
          }
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    openRazorpayCheckout();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 onClick={()=>router.push("/Profile")}  className="text-xl rounded-lg py-2 px-4 bg-slate-700 border-2  animate-pulse">Back to Profile</h1>
    </div>
  );
}
