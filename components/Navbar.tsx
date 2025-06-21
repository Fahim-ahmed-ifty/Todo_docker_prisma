"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          TodoApp
        </Link>
        <div>
          {session ? (
            <div className="flex items-center">
              <span className="text-white mr-4">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white mr-4"
              >
                Login
              </Link>
              <Link href="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
