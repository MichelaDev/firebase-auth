import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ErrorType } from "../types";

const GenericError = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: ErrorType | null;
  setErrorMessage: React.Dispatch<
    React.SetStateAction<ErrorType | null>
  >;
}) => {
  return (
    <div className="w-96 max-w-[90%] h-80 max-h-[90%] flex flex-col items-center bg-bg-light text-base shadow-lg rounded">
      <Link href={"/"} className="block w-max ml-auto p-6">
        <XMarkIcon className="block h-6 w-6" />
      </Link>
      <h1 className="text-lg">OPS!</h1>
      <div className="flex flex-col gap-4 py-6 grow">
        <p>An error occurred:</p>
        <p>{errorMessage?.message}</p>
        <p>Try again</p>
        <p>
          <Link
            href={"/sign-in"}
            className="bg-secondary text-typo-dark hover:bg-opacity-80 font-bold text-sm py-1 px-2 rounded shadow focus:outline-none focus:shadow-outline"
            onClick={() => setErrorMessage(null)}
          >
            Log in
          </Link>
          &nbsp;or&nbsp;
          <button
            className="bg-secondary text-typo-dark hover:bg-opacity-80 font-bold text-sm py-1 px-2 rounded shadow focus:outline-none focus:shadow-outline"
            onClick={() => setErrorMessage(null)}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default GenericError;
