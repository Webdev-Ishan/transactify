"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function CreateOrderPage() {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !number) {
      alert("Please enter all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/transaction", {
        amount: Math.round(Number(amount) * 100),
        Number: Number(number),
      });
      const { order, senderid, recieverid } = res.data;

      // Redirect to Razorpay checkout verify page
      router.push(
        `/Verify?order_id=${order.id}&senderid=${senderid}&receiverid=${recieverid}&amount=${amount}`
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 404) {
          toast.error("Check reciever info again.");
        } else if (status === 401) {
          toast.error("Login please.");
        } else if (status === 403) {
          toast.error("Not Enough Balance");
        } else {
          toast.error("Unexpected Error");
          console.log(error);
        }
      } else {
        if (error instanceof Error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-black text-white px-4">
      <h1 className="text-2xl font-bold mb-6">Create Payment Order</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-white p-4 rounded-lg w-full max-w-sm"
      >
        <div>
          <label htmlFor="number" className="block mb-3">
            Receiver Number
          </label>
          <input
            type="text"
            id="number"
            className="w-full px-4 py-2 rounded mb-3 text-black bg-white"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="e.g., 9876543210"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-3">
            Amount (INR)
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-4 py-2 mb-3 rounded text-black bg-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
}
