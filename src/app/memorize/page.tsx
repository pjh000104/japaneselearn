"use client"

import React, { useEffect, useState} from "react";
import Card from "./card"
import HomeButton from "../components/homebutton";
import LoginOutButton from "../components/login-logout-button";
import { getSpeech } from "../actions";

export default function Page() {
    const [index, setIndex] = useState(0)
    const [wordList, setList] = useState<{ wordId: number; english: string; romaji: string }[]>([]);
    const [word, setWord] = useState(wordList[1])
    
    // will use database to fetch wordlist later
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedList = localStorage.getItem("wordList");
            if (storedList) {
                setList(JSON.parse(storedList));
            }
        }
    }, []);

    useEffect(() => {
        setWord(wordList[0]);
    },[wordList])
    
    function handleNextButtonClick() {
        if(index + 1<wordList.length) {
            setIndex(index+1);
            const newIndex = index+1;
            setWord(wordList[newIndex]);
        }
    }

    const handlePrevButtonClick = () => {
        if(index-1 >-1) {
            setIndex(index-1);
            const newIndex = index-1;
            setWord(wordList[newIndex]);
        }
    }

    async function handleSpeech() {
    const audioUrl = await getSpeech(word.wordId); 
    
    if (!audioUrl) {
        alert("Audio service is unavailable. Please try again later.");
        return;
    }
    
    const audio = new Audio(audioUrl);
    audio.play();
    }

    return (
        <div className=" flex flex-col justify-center items-center h-screen gap-2">
            <div className="flex gap-5 absolute top-5 right-10">
                <HomeButton/>
                <LoginOutButton />
            </div>
            <Card 
                english = {word?.english}
                romaji = {word?.romaji}
                index = {index}
                length = {wordList.length}
            />
            <div className="flex gap-2">
                <button className=" p-1.5 px-3 bg-slate-300 rounded-lg" onClick={handlePrevButtonClick}>Prev</button>
                <button onClick={handleNextButtonClick} className=" p-1.5 px-3 bg-slate-300 rounded-lg">Next</button>
            </div>
            <button className=" p-1.5 px-3 bg-slate-300 rounded-lg" onClick={handleSpeech}>Pronunciation</button>
        </div>
    )
}





