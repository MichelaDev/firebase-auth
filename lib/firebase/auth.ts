import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  NextOrObserver
} from "firebase/auth";
import { FormState, SignupFormSchema } from "../definitions";
import { AUTH_ERRORS } from "@/costants/Errors";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signup(
  state: FormState,
  formData: any
): Promise<FormState> {
  // Validate form fields

  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username") || undefined,
    email: formData.get("email") || undefined,
    password: formData.get("password") || undefined,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    const errors: FormState = {
      errors: {
        email: [...(validatedFields.error.flatten().fieldErrors.email || [])],
        password: [
          ...(validatedFields.error.flatten().fieldErrors.password || []),
        ],
        username: validatedFields.error.flatten().fieldErrors.username,
      },
    };
    return errors;
  }

  const { username, email, password } = validatedFields.data;

  // 3. Insert the user into the database or call an Auth Library's API
  const res = await setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      updateProfile(user, {
        displayName: username,
      });

      console.log("User signed up");

      return {
        isLoggedIn: true,
        user: {
          name: username,
        },
      } as FormState;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      if (errorCode === AUTH_ERRORS.emailExists) {
        return {
          apiError: {
            message: "User email already exists",
            errorCode: errorCode,
          },
        };
      }
      return {
        apiError: { message: errorMessage, errorCode: errorCode },
      } as FormState;
    });

  return res;
}

export async function signin(state: FormState, formData: any) {
  const email = formData.get("email");
  const password = formData.get("password");

  // 3. Insert the user into the database or call an Auth Library's API
  // const signInUser = await signInWithEmailAndPassword(auth, email, password)

  const res = await setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.

      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      // Signed in
      console.log("User signed in");

      return {
        isLoggedIn: true,
        user: {
          name: userCredential.user.displayName,
        },
      } as FormState;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === AUTH_ERRORS.wrongEmailPassword) {
        return {
          apiError: {
            message: "Incorrect email or password.",
            errorCode: errorCode,
          },
        } as FormState;
      }
      return {
        apiError: { message: errorMessage, errorCode: errorCode },
      } as FormState;
    });

  return res;
}

// export async function signInWithGoogle() {
//   const provider = new GoogleAuthProvider();

//   try {
//     await signInWithPopup(auth, provider);
//   } catch (error) {
//     console.error("Error signing in with Google", error);
//   }
// }

export async function signout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");

      return {
        isSignedOut: true,
      };
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        apiError: { message: errorMessage, errorCode: errorCode },
      };
    });
}
