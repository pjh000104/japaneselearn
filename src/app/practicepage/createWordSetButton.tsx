"use client";

import { useState } from "react";
import { createWordSet } from "@/app/actions";

interface CreateWordSetButtonProps {
  children: React.ReactNode;
}

export default function CreateWordSetButton({wordlist}) {
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
          className="border p-2 rounded"
        />
        <button
          onClick={handleCreate}
          disabled={loading || !title.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create WordSet"}
        </button>
      </div>
    );
}