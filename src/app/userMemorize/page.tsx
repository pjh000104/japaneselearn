"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { displayWordSet } from "../actions";
export default function Page() {
  const searchParams = useSearchParams();
  const listId = searchParams.get("q")??"";
  const [words, setWords] = useState<{english: string, romaji: string, wordId: number}[]>([])
  useEffect(()=> {
    if (!listId) return;
    async function fetchData() {
        try{
            const response = await displayWordSet(listId);
            setWords(response)
        }
        catch(error) {
            console.error("error is", error)
        }
    }
    fetchData();
  },[]);

  return (
    <div>
        <h1>Search Query: {listId}</h1>
        <ul>
        {words.length > 0 ? (
          words.map((word) => (
            <li key={word.wordId}>
              {word.english} ({word.romaji})
            </li>
          ))
        ) : (
          <p>No words found.</p>
        )}
      </ul>
    </div>
    
  ) 
}
