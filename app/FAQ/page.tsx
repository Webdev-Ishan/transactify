"use client";
import React from "react";

export default function page() {
  return (
    <div className="bg-black w-full h-auto border-b border-white">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-manrope text-center font-bold text-white leading-[3.25rem]">
              Frequently asked questions
            </h2>
          </div>
          <div className="accordion-group" data-accordion="default-accordion">
            <div
              className="accordion bg-white border border-solid border-gray-300 p-4 rounded-xl transition duration-500 accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4 active"
              id="basic-heading-one-with-icon"
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-black w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                aria-controls="basic-collapse-one-with-icon"
              >
                <h5 className="font-bold mb-4">How can I reset my password?</h5>
                <svg
                  className="w-6 h-6 text-black transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600 origin-center"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className="w-6 h-6 text-black transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id="basic-collapse-one-with-icon"
                className="accordion-content w-full overflow-hidden pr-4"
                aria-labelledby="basic-heading-one"
                style={{ maxHeight: "250px" }}
              >
                <p className="text-base text-black font-normal leading-6">
                  To create an account, find the Sign up button, fill out the
                  registration form with your personal information, and click
                  Create account or Sign up. Verify your email address if
                  needed, and then log in to start using the platform.
                </p>
              </div>
            </div>
            <div
              className="accordion border bg-white border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
              id="basic-heading-two-with-icon"
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-black w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                aria-controls="basic-collapse-two-with-icon"
              >
                <h5 className="font-bold mb-4">
                  How do I update my billing information?
                </h5>
                <svg
                  className="w-6 h-6 text-black transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className="w-6 h-6 text-black transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id="basic-collapse-two-with-icon"
                className="accordion-content w-full overflow-hidden pr-4"
                aria-labelledby="basic-heading-two"
              >
                <p className="text-base text-black  font-normal leading-6">
                  To create an account, find the Sign up button, fill out the
                  registration form with your personal information, and click
                  Create account or Sign up. Verify your email address if
                  needed, and then log in to start using the platform.
                </p>
              </div>
            </div>
            <div
              className="accordion bg-white border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
              id="basic-heading-three-with-icon"
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-black w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                aria-controls="basic-collapse-three-with-icon"
              >
                <h5 className="font-bold mb-4">
                  How can I contact customer support?
                </h5>
                <svg
                  className="w-6 h-6 text-black transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className="w-6 h-6 text-black transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id="basic-collapse-three-with-icon"
                className="accordion-content w-full overflow-hidden pr-4"
                aria-labelledby="basic-heading-three"
              >
                <p className="text-base text-black  font-normal leading-6">
                  To create an account, find the Sign up button, fill out the
                  registration form with your personal information, and click
                  Create account or Sign up. Verify your email address if
                  needed, and then log in to start using the platform.
                </p>
              </div>
            </div>
            <div
              className="accordion bg-white border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
              id="basic-heading-three-with-icon"
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-black w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                aria-controls="basic-collapse-three-with-icon"
              >
                <h5 className="font-bold mb-4">How do I delete my account?</h5>
                <svg
                  className="w-6 h-6 text-black transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className="w-6 h-6 text-black transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id="basic-collapse-three-with-icon"
                className="accordion-content w-full overflow-hidden pr-4"
                aria-labelledby="basic-heading-three"
              >
                <p className="text-base text-black  font-normal leading-6">
                  To create an account, find the Sign up button, fill out the
                  registration form with your personal information, and click
                  Create account or Sign up. Verify your email address if
                  needed, and then log in to start using the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


