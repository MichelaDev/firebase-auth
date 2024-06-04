"use client";

import { auth } from "@/lib/firebase/clientApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  uid: string;
  name: string | null;
  email: string | null;
};

type InitialState = {
  user: UserType | null;
};

// Create auth context
const AuthContext = createContext<InitialState>({ user: null });

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscrive = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    setLoading(false);

    return () => unsubscrive();
  }, []);

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
