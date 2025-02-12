"use client";

import { useFormState } from "react-dom";
import { searchWord } from "./actions";
import Sidebar from "./sidebar";
import { useEffect, useState, useActionState } from "react";
import { setMaxListeners } from "events";
import { list } from "postcss";
import { createConnection } from "net";
import { createContext } from "vm";

export default function WordSearch() {

    const [state, formAction] = useActionState(searchWord, { english: "", romaji: "", error: "" });
    const [wordList, setWordList] = useState<{ id: number; english: string; romaji: string}[]>(() =>[]);

    useEffect(() => {
        if (!state.romaji) return; // Prevent adding an entry if romaji is undefined
        if (wordList.some(item => item.english === state.english)) {
            return;
        }
        setWordList((prevList) => [
            ...prevList,
            { id: prevList.length + 1, english: state.english ?? "", romaji: state.romaji ?? "" },
        ]);
    }, [state]);
    
    const handleDelete = (id: number) => {
        setWordList(wordList.filter(item => item.id != id));
    }

    return (
        <div className="flex">
            <Sidebar list = {wordList} onDelete = {handleDelete}></Sidebar>
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
                <div className="flex flex-col justify-items-start p-2">
                    {state.error && <p className="text-red-500">{state.error}</p>}
                    {state.romaji && <p className=" text-4xl">Word: {state.english}</p>}
                    {state.romaji && <p className=" text-4xl">Pronouciation: {state.romaji}</p>}
                </div>
                

            </div>
        </div>

    );

}
