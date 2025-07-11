"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type transactionList = {
  sender: { username: string; email: string };
  receiver: { username: string };
  amount: string;
};

type BackendResponse = {
  success: boolean;
  message?: string;
  error?: string;
  transactions: transactionList[];
};

export default function Transactions() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      toast.info("Please login first.");
    }
  }, [session]);

  const [transactions, settransactions] = useState<transactionList[]>([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `/api/transactionList`,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        
        settransactions(response.data.transactions);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="w-full mt-4 h-auto  p-8 flex flex-col  items-center">
      <h1 className="text-center text-4xl text-black  mt-6">
        Transaction History
      </h1>
      <div className="w-full mt-12 h-auto gap-6 p-8 flex flex-col  rounded-xl items-center ">
        <ul className="space-y-3 w-full">
          {transactions && transactions.length > 0 ? (
            transactions.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex border-2 transition duration-200 hover:border-green-500 justify-between items-center bg-gray-900 text-white px-4 py-4 rounded-md shadow mb-4"
              >
                {/* Left - Sended by */}
                <div className="w-full   text-left">
                  <p className="text-sm text-blue-400">Sended by:</p>
                  <p className="font-semibold">
                    {item.sender?.username || "N/A"}
                  </p>
                </div>

                {/* Center - Sended to */}
                <div className="w-full text-center">
                  <p className="text-sm text-blue-400">Sended to:</p>
                  <p className="font-semibold">
                    {item.receiver?.username || "N/A"}
                  </p>
                </div>

                {/* Right - Amount */}
                <div className="w-full text-right">
                  <p className="text-sm text-blue-400">Amount:</p>
                  <p
                    className={`font-semibold ${
                      item.sender.email === session?.user.email
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    ₹{item.amount}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-6">
              No transactions found.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}


