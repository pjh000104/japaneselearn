"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import React from "react";
import { displayWordSet, getSpeech } from "../actions";
import Card from "./card";
import Sidebar from "./sidebar";
import HomeButton from "../components/homebutton";
import LoginOutButton from "../components/login-logout-button";

function UsermemorizePage() {
  const searchParams = useSearchParams();
  const listId = searchParams.get("q")??"";
  const [wordList, setWordList] = useState<{english: string, romaji: string, wordId: number}[]>([])
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(wordList[1]);
  const [showWordList, setShowWordList] = useState(false);

  useEffect(()=> {
    if (!listId) return;
    async function fetchData() {
        try{
            const response = await displayWordSet(listId);
            setWordList(response);
            if (response.length > 0) {
                setWord(response[0]); // Set the first word
              }
        }
        catch(error) {
            console.error("error is", error)
        }
    }
    fetchData();
  },[listId]);

  function toggleWordList() {
    setShowWordList(prev => !prev);
  }

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
  
  const randomizeWordList = (array: { english: string; romaji: string; wordId: number }[]) => {
    const shuffled = [...array]; // Create a copy to avoid mutating state directly
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  function handleRandomizeButtonClick() {
    setWordList(randomizeWordList(wordList));
    setWord(wordList[0]);
    setIndex(-1);
  }
  
  return (
        <div className="flex">
            <div className="flex gap-5 absolute top-5 right-10">
                <HomeButton/>
                <LoginOutButton />
            </div>
            {showWordList && <Sidebar wordList = {wordList}/>}
            <div className=" flex flex-col justify-center items-center h-screen w-screen gap-2">
                <button onClick={()=>toggleWordList()} className="p-1.5 px-3 bg-slate-300 rounded-lg">
                    {showWordList ? <p>hide wordlist</p>:
                                    <p>show wordlist</p>}
                </button>
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
                <div className="flex flex-col gap-2">
                    <button onClick={handleSpeech} className="p-1.5 px-3 bg-slate-300 rounded-lg">Pronunciation</button>
                    <button onClick={handleRandomizeButtonClick} className="p-1.5 px-3 bg-slate-300 rounded-lg">Randomize Order</button>
                </div>

            </div>
        </div>
      )

}

export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <UsermemorizePage />
      </Suspense>
    );
  }