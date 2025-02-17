"use server";

import {auth} from "@/auth"
import Image from "next/image";
import Link from 'next/link'
import { SignInGoogle } from "../components/sign-in-button-google";
import { SignOutGoogle } from "../components/sign-out-button-google";
import { getSession } from "next-auth/react";
import SignInForm from "../components/sign-in-form";

export default async function LoginPage() {
  return (
    <div className="flex justify-center align-middle flex-col">
      <Link className="text-5xl"href="/practicepage">Click to Start App!</Link>
      <p>You are not signed in</p>
      <SignInGoogle/>
      <SignInForm/>
    </div>
  );
}
