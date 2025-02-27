"use server";

import { SignInGoogle } from "../components/sign-in-button-google";
import SignInForm from "../components/sign-in-form";

export default async function LoginPage() {
  return (
    <div className="flex justify-center align-middle flex-col">
      <SignInGoogle/>
      <SignInForm/>
    </div>
  );
}
