"use server";

import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { words,wordSet,users,wordSetWords } from "@/lib/db/schema";
import { auth } from "@/auth"

// Define a strict type for the state
interface FormState {
  wordId?: number;
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

  return { wordId: info[0].id, english: info[0].meaning, romaji: info[0].romaji };
}

// create new word set
export async function createWordSet(title: string, wordlist: {id: number; english: string; romaji: string }[]) {
    const session = await auth();
    if (!session || !session.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    const userId = user[0].id;
    const [newWordSet] = await db.insert(wordSet).values({
      userId,
      title,
    }).returning({ id: wordSet.id});

    if (!newWordSet) throw new Error("Failed to create wordSet");
    const wordIds = wordlist.map(word => word.id);
    const wordSetId = newWordSet.id;
    if (wordIds.length > 0) {
      await db.insert(wordSetWords).values(
        wordIds.map(wordId => ({
          wordSetId,
          wordId,
        }))
      );
    }
    else {
      console.log("There should be atleast one word in the list");
    }
  console.log("WordSet created successfully with ID:", wordSetId);  

  return newWordSet;
}

export async function searchWordSet() {
  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);


  if (user.length === 0) {
    throw new Error("User not found in database");
  }

  const wordlist = await db.select().from(wordSet).where(eq(wordSet.userId, user[0].id))
  if (wordlist.length === 0) {
    throw new Error("WordSet not found in database");
  }

  return {wordlist};
}

export async function displayWordSet(listId: string) {
  const wordIds = await db
    .select({ wordId: wordSetWords.wordId })
    .from(wordSetWords)
    .where(eq(wordSetWords.wordSetId, listId));

  const wordIdList = wordIds.map(row => row.wordId);

  const wordlist = [];

  for (const wordId of wordIdList) {
    const word = await db
      .select({ english: words.meaning, romaji: words.romaji })
      .from(words)
      .where(eq(words.id, wordId));

    if (word.length > 0) {
      wordlist.push({ wordId, ...word[0] }); 
    }
  }
  return wordlist;
}

export async function deleteWordSet(wordSetId: string) {
  await db.delete(wordSet).where(eq(wordSet.id, wordSetId));
}

export async function deleteWord(wordSetId: string, wordId: number) {
  await db.delete(wordSetWords).where(
    and(
      eq(wordSetWords.wordSetId, wordSetId),
      eq(wordSetWords.wordId, wordId)
    )
  );
}

export async function addWord(wordSetId: string, wordId: number) {
  try {
    console.log("inserting word into database");
    await db.insert(wordSetWords).values({
      wordSetId,
      wordId,
    });
    console.log("Successfuly inserted word into wordset");
    
  } catch (error) {
    console.error("Error adding word to wordset: ", error);
  }
}

interface User {
  name: string;
  email: string;
  id: string;
}

export async function getLoginStatus(): Promise<{user: User | null, sessionType: string | null}> {
  const session = await auth();
  let sessionType = "google";
  
  if (!session) {
    sessionType = "custom";
  }

  const user = session?.user
  ? { 
      ...session.user, 
      name: session.user.name ?? "Unknown User", 
      email: session.user.email ?? "", // Ensure email is always a string
      id: session.user.id ?? "", // Ensure id is always a string
      image: session.user.image ?? "", // Ensure image is always a string
    }
  : null;

  return({user,sessionType});
}
