"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignOut() {
  const router = useRouter();
  const [loggedin, setloggedin] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setloggedin(true);
    }
  }, [session, status]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setloggedin(false);
  };
  return (
    <>
      {loggedin && (
        <button
          type="button"
          onClick={handleLogout}
          className="focus:outline-none text-black bg-red-700  focus:ring-4 focus:ring-red-300 font-medium rounded-lg hover:bg-white text-sm px-2.5 py-1 mt-1 mb-1  dark:bg-red-600 dark:hover:bg-white dark:focus:ring-red-900"
        >
          Logout
        </button>
      )}
      :
      {
        <button
          type="button"
          onClick={() => router.push("/signin")}
          className="focus:outline-none text-black bg-red-700  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 mt-1 mb-1 hover:bg-white   dark:bg-red-600 dark:hover:bg-white dark:focus:ring-red-900"
        >
          SignIn
        </button>
      }
    </>
  );
}
export default SignOut;
