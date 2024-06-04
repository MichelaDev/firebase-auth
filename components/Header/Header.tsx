"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { onAuthStateChanged, signout } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseConfig } from "@/lib/firebase/config";
import { User } from "firebase/auth";

function useUserSession(initialUser: User) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`
    
      navigator.serviceWorker
      .register(serviceWorkerUrl)
      .then((registration) => console.log("scope is: ", registration.scope));
    }
    }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return user;
}

const Header = ({initialUser}: {initialUser: User}) => {

  const user = useUserSession(initialUser) ;

  return (
    <Disclosure as="nav" className="fixed w-full bg-secondary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between sm:justify-center">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="sm:absolute sm:inset-y-0 sm:left-0 flex flex-shrink-0 gap-2 items-center">
                <div className="block sm:hidden text-base lg:block">
                  Firebase AUTH
                </div>
              </div>

              {/* Login */}
              <div className="sm:absolute sm:inset-y-0 sm:right-0 flex gap-2 items-center">
                {user ? (
                  <div className="rounded bg-secondary p-6"></div>
                ) : (
                  <>
                    <Link
                      href={"/sign-in"}
                      className={`text-typo-dark hover:bg-primary hover:bg-opacity-50 font-bold text-base py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                      Sign in
                    </Link>
                    <Link
                      href={"/sign-up"}
                      className={`bg-primary text-typo-light hover:bg-opacity-80 font-bold text-base py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline`}
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {user && (
                  <button
                    onClick={() => signout()}
                    className={`bg-primary text-typo-light hover:bg-opacity-80 font-bold text-base py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline`}
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button>Sign up</Disclosure.Button>
              <Disclosure.Button>Sign in</Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;