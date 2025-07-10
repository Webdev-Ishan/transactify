"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type transactionList = {
  sender: string;
  reciever: string;
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

function Profile() {
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

      <div className="w-full mt-12 h-auto gap-6 flex flex-col justify-center rounded-xl items-center bg-black">
        <ul className="space-y-3">
          {transactions && transactions.length > 0 ? (
            transactions.map((item, idx) => (
              <React.Fragment key={idx}>
                <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-lg text-blue-600">
                    Sended by:
                  </span>
                  <span className="font-semibold text-lg text-white">
                    {item.sender}
                  </span>
                </li>
                <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-lg text-blue-600">
                    Sended to:
                  </span>
                  <span className="font-semibold text-lg text-white">
                    {item.reciever}
                  </span>
                </li>
                <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-lg text-blue-600">
                    Amount:
                  </span>
                  <span className="font-semibold text-lg text-white">
                    {item.amount}
                  </span>
                </li>
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-6">
              No transactions found.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
