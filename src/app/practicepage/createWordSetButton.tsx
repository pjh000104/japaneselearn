"use client";

import { useState } from "react";
import { createWordSet } from "@/app/actions";

interface Word {
  id: number;
  english: string;
  romaji: string;
}

interface CreateWordSetButtonProps {
  wordlist: Word[];
}

export default function CreateWordSetButton({ wordlist }: CreateWordSetButtonProps) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    async function handleCreate() {
      setLoading(true);
      try {
        await createWordSet(title,wordlist);
        alert("WordSet created successfully!");
        setTitle(""); // Reset input field
      } catch (error) {
        alert("Failed to create WordSet.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter word set title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-3/4 h-1/2 text-black"
        />
        <button
          onClick={handleCreate}
          disabled={loading || !title.trim()}
          className="bg-blue-500 text-white  rounded hover:bg-blue-600 disabled:bg-gray-400 w-1/4 "
        >
          {loading ? "Creating..." : "create"}
        </button>
      </div>
    );
}