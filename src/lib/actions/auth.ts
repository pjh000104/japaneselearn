"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signIn, signOut } from "@/auth"

export const loginGoogle = async () => {
    await signIn("google", { redirectTo: "/" });

};

export const logoutGoogle = async () => {
    await signOut({redirectTo: "/loginpage" })
};

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

  
export async function decrypt<T extends Record<string, unknown>>(input: string): Promise<T> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as T;
}


//   export async function signup(formData: FormData) {

//   }

  export async function login(formData: FormData) {
    // Verify credentials && get the user
  
    const user = { email: formData.get("email"), name: "John" };
  
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });
  
    // Save the session in a cookie
    const cookieStore = await cookies();
    cookieStore.set("session", session, { expires, httpOnly: true });
  }
  
  export async function logout() {
    // Destroy the session
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });
  }
  
  export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  }
  
  interface SessionPayload {
    expires?: Date;
    [key: string]: unknown; // Allow additional dynamic properties
  }
  
  export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Explicitly type the decrypted session
    const parsed: SessionPayload = await decrypt<SessionPayload>(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
  
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
  
    return res;
  }
  
