import type { Metadata } from "next";
import "./globals.css";
import { jersey } from "@/fonts";
import Header from "@/components/Header/Header";
import { AuthContextProvider } from "@/context/AuthContest";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { User } from "firebase/auth";

export const metadata: Metadata = {
  title: "Firebase auth",
  description: "Firebase authentication",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="en">
      <body className={`${jersey.className} relative tracking-wide bg-bg-dark min-w-screen min-h-screen`}>
        <AuthContextProvider>
          <Header initialUser={currentUser?.toJSON() as User} />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
