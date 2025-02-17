"use client"

import { loginGoogle } from "@/lib/actions/auth";
export const SignInGoogle = () => {
    return(
    <button onClick={()=>loginGoogle()}>Sign in with Google</button>
    )
}