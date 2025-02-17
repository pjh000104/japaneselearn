"use client"

import { redirect } from "next/navigation";
import {logout} from "@/lib/actions/auth"

export default function SignOutButton() {
    return (
        <form
        action={async () => {
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
    )
}