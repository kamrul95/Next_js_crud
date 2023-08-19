"use client";
import Button from "@/components/shared/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { username, password });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="w-1/2 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-transparent"
        >
          <input
            type="text"
            name="username"
            placeholder="User name"
            className="p-2 outline-none border-2 border-gray-300 bg-transparent"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="p-2 outline-none border-2 border-gray-300 bg-transparent"
          />
          <Button title="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;