"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { searchWord, displayWordSet, addWord} from "../actions";
import Sidebar from "./sidebar";
import HomeButton from "../components/homebutton";
import LoginOutButton from "../components/login-logout-button";

export default function Page() {
    const [state, formAction] = useActionState(searchWord, { english: "", romaji: "", error: "", wordId: 0 });
    const [wordList, setWordList] = useState<{english: string, romaji: string, wordId: number}[]>([])
    const [inputWord, setInputWord] = useState(""); // State for controlled input
    const searchParams = useSearchParams();
    const listId = searchParams.get("q")??"";

    useEffect(()=> {
    if (!listId) return;
    async function fetchData() {
        try{
            const response = await displayWordSet(listId);
            setWordList(response);
        }
        catch(error) {
            console.error("error is", error)
        }
    }
    fetchData();
    },[listId]);

    useEffect(() => {
        if (!state.romaji) return;
        if (wordList.some(item => item.english === state.english)) {
            return;
        }
        addWordtoSet();
    }, [state]);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Allow only letters and spaces
        if (/^[A-Za-z\s]*$/.test(value)) {
            setInputWord(value);
        }
    };

    async function addWordtoSet() {
        await addWord(listId, state.wordId ?? 0);
        window.location.reload();
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sanitizedInput = DOMPurify.sanitize(inputWord); // Sanitize user input
        const formData = new FormData();
        formData.append("word", sanitizedInput);
        formAction(formData);
        console.log("wordID:", state.wordId)
    };

    return (
        <div className="flex">
            <Sidebar 
                wordList = {wordList}
                wordListId= {listId}>
            </Sidebar>
            <div className="flex flex-col items-center justify-center w-4/5">
                <div className="flex gap-5 absolute top-5 right-10">
                    <HomeButton/>
                    <LoginOutButton />
                </div>
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
    )
}