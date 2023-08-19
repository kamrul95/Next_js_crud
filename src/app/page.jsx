"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    } 
    router.push("/login");
  }, [session, router]);
  return (
    <main>
      
    </main>
  );
}
