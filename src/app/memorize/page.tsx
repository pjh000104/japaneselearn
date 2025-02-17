"use client"

import React, { useEffect, useState} from "react";
import Card from "./card"

export default function Page() {
    const [index, setIndex] = useState(0)
    const [wordList, setList] = useState<{ id: number; english: string; romaji: string }[]>([]);
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

    return (
        <div className=" flex flex-col justify-center items-center h-screen">
            <Card 
                english = {word?.english}
                romaji = {word?.romaji}
            />
            <div className="flex mt-5 gap-2">
                <button className=" p-1.5 px-3 bg-slate-300 rounded-lg" onClick={handlePrevButtonClick}>Prev</button>
                <button onClick={handleNextButtonClick} className=" p-1.5 px-3 bg-slate-300 rounded-lg">Next</button>
            </div>

        </div>
    )
}





