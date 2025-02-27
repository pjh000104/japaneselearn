"use client"

import { redirect } from "next/navigation";
import {login} from "@/lib/actions/auth"

export default function SignInForm() {
    return(
        <form
        action={async (formData) => {
          await login(formData);
          redirect("/");
        }}
      >
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Login</button>
      </form>
    )
}