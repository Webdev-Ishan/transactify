"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type transactionList = {
  sender: { username: string };
  receiver: { username: string };
  amount: string;
};

type BackendResponse = {
  success: boolean;
  message?: string;
  error?: string;
  userinfo: {
    username: string;
    email: string;
    upiID: string;
    balance: string;
  };
  transactions: transactionList[];
};

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      toast.info("Please login first.");
    }
  }, [session]);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [upiID, setupiID] = useState("");
  const [balance, setbalance] = useState("");
  const [transactions, settransactions] = useState<transactionList[]>([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get<BackendResponse>(`/api/Profile`, {
        withCredentials: true,
      });

      if (response.data && response.data.success) {
        setusername(response.data.userinfo.username);
        setemail(response.data.userinfo.email);
        setupiID(response.data.userinfo.upiID);
        settransactions(response.data.transactions.splice(0, 9));
        setbalance(response.data.userinfo.balance);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
        setusername("");
        setemail("");
        setupiID("");
        setbalance("");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="w-full mt-4 h-auto p-4 flex flex-col justify-center items-center">
      <div className="w-full mt-12 h-auto gap-6 flex flex-col justify-center items-center">
        <div className="w-full text-center pl-4 pr-4">
          <h1 className="font-bold text-4xl ">Personal Info</h1>
        </div>

        <div className="w-full max-w-md   mx-auto p-6 bg-black rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold text-center mb-10 text-white">
            Profile Info
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                Username:
              </span>
              <span className="font-semibold text-lg text-white">
                {username}
              </span>
            </li>
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">Email:</span>
              <span className="font-semibold text-lg text-white">{email}</span>
            </li>
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                UPI ID:
              </span>
              <span className="font-semibold text-lg text-white">{upiID}</span>
            </li>
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                Account Balance:
              </span>
              <span className="font-semibold text-lg text-green-400">
                ${balance}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => router.push("/transaction")}
        className="px-2 py-2 w-24 m-8 rounded-md border-2 hover:border-black font-bold  bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
      >
        Pay
      </button>

      <div className="w-full  h-auto  p-4 flex flex-col  items-center">
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
                    <p className={`font-semibold text-white`}>₹{item.amount}</p>
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
    </div>
  );
}


