"use client";

import { useEffect, useState } from "react";
import { getLoginStatus } from "@/app/actions";
import { SignOutGoogle } from "./sign-out-button-google";
import Link from "next/link";

export default function LoginOutButton() {
  const [user, setUser] = useState<any>(null);
  // const [sessionType, setSessionType] = useState("");


  useEffect(() => {
    async function fetchSession() {
      const data = await getLoginStatus();
      setUser(data.user);
      // setSessionType(data.sessionType);
    }
    fetchSession();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <div>Logged in with {user?.name} </div>
          <SignOutGoogle />
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <Link href="/loginpage">login</Link>
        </div>
      )}
    </div>
  );
}
