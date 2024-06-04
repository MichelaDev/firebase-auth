import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FormState } from "@/lib/definitions";

export default function SignUpForm({
  action,
  state,
  pending,
}: {
  action: (formData: FormData) => void;
  state: FormState;
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
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-typo-dark border text-base focus:outline-none focus:shadow-outline bg-bg-light"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
          {state?.errors?.username && (
            <p className="pt-1 text-base text-red-600">{state.errors.username}</p>
          )}
        </div>
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
          {state?.errors?.email && <p className="pt-1 text-base text-red-600">{state.errors.email}</p>}
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
          {state?.errors?.password && (
            <div>
              {state.errors.password[0] === "Required" ? (
                <p className="pt-1 text-base text-red-600">{state.errors.email}</p>
              ) : (
                <>
                  <p className="pt-1 text-base text-red-600">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li className="text-base text-red-600" key={error}>- {error}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-center px-12">
          <button
            className={`bg-secondary text-typo-dark hover:bg-opacity-80 font-bold text-base py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline ${
              pending && "pointer-events-none"
            }`}
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
  );
}
