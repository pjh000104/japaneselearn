"use server";

import {auth} from "@/auth"
import Image from "next/image";
import Link from 'next/link'
import { SignOutGoogle } from "./components/sign-out-button-google";
import { getSession } from "../lib/actions/auth";
import SignOutButton from "./components/sign-out-button"

export default async function Home() {
  let session = await auth();
  let sessiontype = "google";
  if(!session) {
    session = await getSession();
    sessiontype = "custom";
  }
  if (session?.user) {
    return (
      <div>
        User logged in with name: {session.user.name} 
        <Link className="text-5xl"href="/practicepage">Click to Start App!</Link>
        {sessiontype==="google" ? <SignOutGoogle/> :
        <SignOutButton/>}
      </div>
      
    )
  }
  return (
    <div className="flex justify-center align-middle">
      <p>You are not signed in</p>
      <Link href="/loginpage">login</Link>
    </div>
  );
}
