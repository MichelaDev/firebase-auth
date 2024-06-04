"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../Loader";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import EmailAlreadyExists from "./Errors/EmailAlreadyExists";
import { AUTH_ERRORS } from "@/costants/Errors";
import WrongEmailPassword from "./Errors/WrongEmailPassword";
import GenericError from "./Errors/GenericError";
import { ErrorType } from "./types";
import { signin, signup } from "@/lib/firebase/auth";

export default function SignUser() {
  const router = useRouter();
  const path = usePathname();

  const [state, action] = useFormState(
    path === "/sign-up" ? signup : signin,
    undefined
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);

  const handleLoginSucces = useCallback(() => {
    setIsLoggedIn(true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [router]);

  const handleSubmit = (payload: FormData) => {
    setPending(true);
    action(payload);
  };

  useEffect(() => {
    if (state?.errors) {
      setPending(false);
    }
    if (state?.isLoggedIn) {
      setPending(false);
      handleLoginSucces();
    }
    if (state?.apiError) {
      setPending(false);
      setErrorMessage({
        code: state.apiError.errorCode,
        message: state.apiError.message,
      });
    }
  }, [state, handleLoginSucces]);

  const renderComponent = (currentPath: string) =>
    currentPath === "/sign-in" ? (
      <SignInForm pending={pending} action={handleSubmit} />
    ) : (
      <SignUpForm pending={pending} action={handleSubmit} state={state} />
    );

  // const handleSubmitWithGoogle = () => {
  //   signInWithGoogle().then((value) => console.log(value));
  //   router.push("/");
  // };

  const renderError = (message: string) => {
    switch (message) {
      case AUTH_ERRORS.emailExists:
        return (
          <EmailAlreadyExists
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        );
      case AUTH_ERRORS.wrongEmailPassword:
        return (
          <WrongEmailPassword
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        );
      default:
        return (
          <GenericError
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        );
    }
  };

  return (
    <div className="absolute flex w-screen h-screen items-center justify-center bg-gradient-to-r from-bg-dark/80 to-primary/80">
      {isLoggedIn ? (
        <div className="w-96 max-w-[90%] h-80 max-h-[90%] flex justify-center items-center bg-bg-light text-lg shadow-lg rounded">
          {`Hello${state?.user?.name && " " + state.user.name}!`}
        </div>
      ) : pending && !errorMessage?.code ? (
        <div className="w-96 max-w-[90%] h-80 max-h-[90%] flex justify-center items-center bg-bg-light text-lg shadow-lg rounded">
          <Loader />
        </div>
      ) : errorMessage?.code ? (
        renderError(errorMessage.code)
      ) : (
        <div className="w-96 max-w-[90%] h-max max-h-[90%] bg-bg-light text-lg shadow-lg rounded flex flex-col items-center justify-center pb-12 gap-6">
          {renderComponent(path)}
          {/* <p>or</p>
          <button
            className="bg-secondary text-typo-dark hover:bg-opacity-80 font-bold text-base py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline"
            onClick={handleSubmitWithGoogle}
          >
            Log in with Google
          </button> */}
        </div>
      )}
    </div>
  );
}
