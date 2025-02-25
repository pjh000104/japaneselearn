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
      <SignInGoogle/>
      <SignInForm/>
    </div>
  );
}
