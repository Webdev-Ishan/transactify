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
        // Sign in using credentials if email/password are returned
        await signIn("credentials", {
          email: response.data.email, // assume backend returns this
          username: response.data.username, // or a temporary login token
          id: response.data.id,
          redirect: false,
        });
        toast.success("Verification successful. Logging you in...");

        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 409) {
          toast.error("Please Register first!");
          router.push("/register");
          console.log(error);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleOtpSubmit}
        className="w-full max-w-sm space-y-6 p-6 rounded-lg bg-black shadow-lg"
      >
        <h2 className="text-white text-xl font-semibold text-center">
          Enter OTP
        </h2>

        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
          <InputOTPGroup className="text-white justify-center gap-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <div className="text-center text-white text-sm">
          {otp === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {otp}</>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-white text-black py-2 font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default InputOTPControlled;
