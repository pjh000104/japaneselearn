"use client";

import { useFormState } from "react-dom";
import { searchWord } from "./actions";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

export default function WordSearch() {
    const [state, formAction] = useFormState(searchWord, { english: "", romaji: "", error: "" });
    const [wordList, setWordList] = useState<{ id: number; name: string; word: string}[]>(() =>[]);

    useEffect(() => {
        if (!state.romaji) return; // Prevent adding an entry if romaji is undefined
            setWordList((prevList) => [
                ...prevList,
                { id: prevList.length + 1, name: state.romaji ?? "", word: state.english ?? "" },
            ]);
    }, [state]);
    
    return (
    <div className="flex">
        <Sidebar list = {wordList}></Sidebar>
        <div className=" flex flex-col items-center justify-center w-4/5">
            <form action={formAction} className="flex items-center space-y-4 w-1/2">
                <input
                type="text"
                name="word"
                placeholder="Enter a word"
                className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
            </form>

            {state.error && <p className="text-red-500">{state.error}</p>}
            {state.romaji && <p className="text-green-500">Word: {state.english} Romaji: {state.romaji}</p>}
        </div>
    </div>

    );
}
