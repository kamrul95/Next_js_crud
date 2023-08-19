"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const session = useSession()
  const links = [
    { id: 1, title: "Dashboard", url: "/dashboard" },
  ];
  return (
    <nav className="text-gray-300 py-5 flex justify-between text-xl items-center mx-20">
      <Link href="/" className="text-3xl font-bold">Walton Hi-tech</Link>
      <div className="flex items-center gap-5">
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            <span className="hover:text-white">{link.title}</span>
          </Link>
        ))}
        {session.status == 'authenticated' && <button 
          onClick={()=> signOut('google')}
          className="text-lg bg-red-500 px-3 py-1 rounded-sm hover:bg-red-400 hover:text-white"  
        >Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
