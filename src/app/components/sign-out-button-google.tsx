"use client"

import { logoutGoogle } from "@/lib/actions/auth";
export const SignOutGoogle = () => {
    return(
    <button onClick={()=>logoutGoogle()}>Sign out</button>
    )
}