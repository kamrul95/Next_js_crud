"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  if (session.status == "authenticated") {
    return (
      <div className="bg-transparent mt-2  w-[300px] mx-auto">
        <Link
          className="text-2xl font-semibold bg-emerald-400 p-2 rounded-sm"
          href="/dashboard/products"
        >
          Go to product List page
        </Link>
      </div>
    );
  }
};

export default Dashboard;
