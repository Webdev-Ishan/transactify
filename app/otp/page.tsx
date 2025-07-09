"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function InputOTPControlled() {
  const router = useRouter();

  const [otp, setOtp] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // ✅ Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("/api/auth/verify-email", {
        otp, // match backend key here
        email,
      });

      if (response.data?.success) {
        toast.success("Verification successful. Logging you in...");

        // Sign in using credentials if email/password are returned
        await signIn("credentials", {
          email: response.data.email, // assume backend returns this
          username: response.data.username, // or a temporary login token
          id: response.data.id,
          redirect: false,
        });

        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 409) {
          toast.error("Please Register first!");
          router.push("/register");
        } else {
          toast.error("Something went wrong!");
          console.error("Unknown error:", error);
        }
      } else {
        if (error instanceof Error) {
          toast.error("Unexpected Error Occurred!");
          console.error("Unknown error:", error);
        }
      }
    } finally {
      setIsSubmitting(false);
      setOtp("");
    }
  };

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-6 mt-10 h-60 ">
      <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
        <InputOTPGroup className="text-white">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="text-center text-white text-sm h-full">
        {otp === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {otp}</>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black text-white py-2 font-medium hover:bg-slate-800  disabled:opacity-50"
      >
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}

export default InputOTPControlled;
