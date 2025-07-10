"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const registerSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function SignupFormDemo() {
  const router = useRouter(); // ✅ Don't destructure anything

  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, session]);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = registerSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      toast.error("Invalid input");
      return;
    }

    try {
      const response = await signIn("credentials", {
        email: result.data.email, // assume backend returns this
        password: result.data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("LoggedIn successfull.");
        setemail("");
        setpassword("");
      } else if (response?.ok === false) {
        toast.error("Register yourself please");
        router.push("/register");
        setemail("");
        setpassword("");
      } else {
        toast.error("Something went wrong.");
        console.log(response?.error);
        setemail("");
        setpassword("");
      }
    } catch (error) {
      toast.error("OOps try again!!");
      console.log(error);
      setemail("");
      setpassword("");
    }
  };
  return (
    <div className="w-full h-auto flex mt-10 justify-center items-center mb-4">
      <div className="shadow-input mt-10  ml-2 mr-2 bg-black   w-full max-w-md rounded-none  border border-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Transactify
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login here please
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"></div>
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

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
        <button
          className="group/btn relative transition duration-300 hover:shadow-blue-500 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          onClick={() => signIn("google",{callbackUrl:"/"})}
        >
           Login with Google
        </button>
        <button
          className="group/btn mt-3 transition duration-300 hover:shadow-blue-500 relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          onClick={() => signIn("github",{callbackUrl:"/"})}
        >
          Login with Github
        </button>
      </div>
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
