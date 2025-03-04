"use client";

import { searchWord, getLoginStatus } from "./actions";
import Sidebar from "./components/sidebar";
import { useEffect, useState, useActionState } from "react";
import LoginOutButton from "./components/login-logout-button";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

export default function WordSearch() {
    const [state, formAction] = useActionState(searchWord, { english: "", romaji: "", error: "", wordId: 0 });
    const [wordList, setWordList] = useState<{ wordId: number; english: string; romaji: string }[]>(() => []);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputWord, setInputWord] = useState(""); // State for controlled input

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedList = localStorage.getItem("wordList");
            if (storedList) {
                setWordList(JSON.parse(storedList));
            }
        }
    }, []);

    useEffect(() => {
        if (!state.romaji) return;
        if (wordList.some(item => item.english === state.english)) {
            return;
        }
        setWordList((prevList) => [
            ...prevList,
            { wordId: state.wordId ?? 0, english: state.english ?? "", romaji: state.romaji ?? "" },
        ]);
    }, [state]);

    const handleDelete = (id: number) => {
        setWordList(wordList.filter(item => item.wordId !== id));
    };

    useEffect(() => {
        async function fetchdata() {
            const data = await getLoginStatus();
            setIsLoggedIn(!!data.user);
        }
        fetchdata();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Allow only letters and spaces
        if (/^[A-Za-z\s]*$/.test(value)) {
            setInputWord(value);
        }
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sanitizedInput = DOMPurify.sanitize(inputWord); // Sanitize user input
        const formData = new FormData();
        formData.append("word", sanitizedInput);
        formAction(formData);
    };

    return (
        <div className="flex">
            <Sidebar list={wordList} onDelete={handleDelete} isLoggedIn={isLoggedIn} />
            <div className="flex flex-col items-center justify-center w-4/5">
                <div className="flex gap-5 absolute top-5 right-10">
                    {isLoggedIn && (
                        <Link href="/wordsets" className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600 h-1/2">
                            My Word Sets
                        </Link>
                    )}
                    <LoginOutButton />
                </div>
                <h2 className="text-4xl">No Kanji Japanese Word Translator</h2>
                <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4 w-1/2">
                    <input
                        type="text"
                        name="word"
                        placeholder="Enter a word"
                        className="border p-2 w-full"
                        value={inputWord}
                        onChange={handleInputChange} // Controlled input
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2">
                        Search
                    </button>
                </form>
                <div className="flex flex-col justify-items-start p-2">
                    {state.error && <p className="text-red-500">{state.error}</p>}
                    {state.romaji && <p className="text-4xl">Word: {state.english}</p>}
                    {state.romaji && <p className="text-4xl">Pronunciation: {state.romaji}</p>}
                </div>
            </div>
        </div>
    );
}
