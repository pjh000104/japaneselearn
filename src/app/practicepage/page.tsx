"use client";

import { searchWord, getLoginStatus } from "../actions";
import Sidebar from "./sidebar";
import { useEffect, useState, useActionState } from "react";
import LoginOutButton from "../components/login-logout-button";
import Link from "next/link";

export default function WordSearch() {
    const [state, formAction] = useActionState(searchWord, { english: "", romaji: "", error: "", id:0 });
    const [wordList, setWordList] = useState<{ id: number; english: string; romaji: string}[]>(() =>[]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (!state.romaji) return; // Prevent adding an entry if romaji is undefined
        if (wordList.some(item => item.english === state.english)) {
            return;
        }
        setWordList((prevList) => [
            ...prevList,
            { id: state.id ?? 0, english: state.english ?? "", romaji: state.romaji ?? "" },
        ]);
    }, [state]);
    
    const handleDelete = (id: number) => {
        setWordList(wordList.filter(item => item.id != id));
    }

     useEffect (()=> {
            async function fetchdata () {
                const data = await getLoginStatus();
                if (data.user) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                } 
            }
            fetchdata();
        },[])

    return (
        <div className="flex">
            <Sidebar list = {wordList} 
                     onDelete = {handleDelete}
                     isLoggedIn = {isLoggedIn}>
            </Sidebar>
            <div className=" flex flex-col items-center justify-center w-4/5">
                <div className=" flex gap-5 absolute top-5 right-10">
                    {isLoggedIn && <Link href="/wordsets" className="bg-gray-800 text-white  p-2 rounded hover:bg-gray-600  h-1/2">Myword sets</Link>}
                    <LoginOutButton/></div>
                <h2 className=" text-4xl">No Kanji Japanese Word Translator</h2>
                <form action={formAction} className="flex justify-center items-center space-y-4 w-1/2">
                    <input
                    type="text"
                    name="word"
                    placeholder="Enter a word"
                    className="border p-2 w-full "
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 ">Search</button>
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
