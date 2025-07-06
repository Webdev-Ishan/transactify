"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSession } from "next-auth/react";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  number: z.string().length(10, "Mobile number must be 10 digits."),
  upiID: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
});

export function SignupFormDemo() {
  const router = useRouter(); // ✅ Don't destructure anything

  const { data: session } = useSession();

  React.useEffect(() => {
    if (session) {
      router.push("/Profile");
    }
  }, [session]);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [upiID, setupiID] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = registerSchema.safeParse({
      email,
      username,
      password,
      number,
      upiID,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      toast.error(errors.username?.[0] || "Invalid input");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", result.data);

      if (response.data && response.data.success) {
        toast.success("An OTP i sended to your registered email.");
        setemail("");
        setpassword("");
        setusername("");
        setnumber("");
        setupiID("");
        router.push("/otp");
      } else {
        toast.success("Something went wrong.");
        setemail("");
        setpassword("");
        setusername("");
        setnumber("");
        setupiID("");
        console.log(response.data.error);
      }
    } catch (error) {
      toast.error("OOps try again!!");
      console.log(error);
      setemail("");
      setpassword("");
      setusername("");
      setnumber("");
      setupiID("");
    }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white border border-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Transactify
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        SignUp here please
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">Username</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Number">number no.</Label>
          <Input
            id="Number"
            placeholder="0000000"
            type="text"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="UPI_id">UPI id</Label>
          <Input
            id="upiid"
            placeholder="........"
            type="text"
            value={upiID}
            onChange={(e) => setupiID(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default SignupFormDemo;
