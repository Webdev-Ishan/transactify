import React from "react";

function page() {
  return (
    <div className="w-full mt-4 h-auto p-4 flex justify-center items-center">
      <div className="w-full mt-12 h-auto gap-6 flex flex-col justify-center items-center">
        <div className="w-full text-center pl-4 pr-4">
          <h1 className="font-bold text-4xl ">Personal Info</h1>
        </div>

        <div className="w-full max-w-md  mx-auto p-6 bg-black rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-10 text-white">
            Profile Info
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                Username:
              </span>
              <span className="font-semibold text-lg text-white">
                Ravi123
              </span>
            </li>
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                Email:
              </span>
              <span className="font-semibold text-lg text-white">
                ravi@example.com
              </span>
            </li>
            <li className="flex justify-between mb-10 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-lg text-blue-600 ">
                UPI ID:
              </span>
              <span className="font-semibold text-lg text-white">
                ravi@upi
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
