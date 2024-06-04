"use client"

import { useUser } from "@/lib/firebase/getUser";

export default function Home() {
  const user = useUser();
  return (
    <main className="w-screen h-screen flex justify-center items-center text-2xl text-typo-light">
      {user ? 
        `Hello ${user?.displayName}!`
        :
        "You are not signed in"
      }
    </main>
  );
}