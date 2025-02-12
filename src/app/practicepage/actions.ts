"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { words } from "@/lib/schema";

// Define a strict type for the state
interface FormState {
  error?: string;
  romaji?: string;
  english?: string;
}

// Ensure the function receives `prevState` as the first argument
export async function searchWord(prevState: FormState, formData: FormData): Promise<FormState> {
  const word = formData.get("word") as string;

  if (!word) {
    return { error: "Please enter a word!" };
  }
  
  const info = await db.select().from(words).where(eq(words.meaning, word));

  if (info.length === 0) {
    return { error: "Word not found." };
  }

  return { english: info[0].meaning, romaji: info[0].romaji };
}
