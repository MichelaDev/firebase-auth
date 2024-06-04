import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SignInForm({
  action,
  pending,
}: {
  action: (formData: FormData) => void;
  pending: boolean;
}) {
  return (
      <form
        action={action}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Link href={"/"} className="block w-max ml-auto p-6">
          <XMarkIcon className="block h-6 w-6" />
        </Link>
        <div className="w-full mb-4 px-12">
          <label
            className="block text-typo-dark text-base font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-typo-dark border text-base focus:outline-none focus:shadow-outline bg-bg-light"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="w-full mb-6 px-12">
          <label
            className="block text-typo-dark text-base font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-typo-dark border text-base focus:outline-none focus:shadow-outline bg-bg-light"
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>
        <div className="w-full flex items-center justify-center px-12">
          <button
            className={`bg-secondary text-typo-dark hover:bg-opacity-80 font-bold text-base py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline ${
              pending && "pointer-events-none"
            }`}
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
  );
}
