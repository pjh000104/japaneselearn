"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { displayWordSet } from "../actions";
import Card from "./card";
import Sidebar from "./sidebar";

export default function Page() {
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
  return (
        <div className="flex">
            {showWordList && <Sidebar wordList = {wordList}
                     wordListId= {listId}/>}
            <div className=" flex flex-col justify-center items-center h-screen w-screen">
                <Card 
                    english = {word?.english}
                    romaji = {word?.romaji}
                    index = {index}
                    length = {wordList.length}
                />
                <div className="flex mt-5 gap-2">
                    <button className=" p-1.5 px-3 bg-slate-300 rounded-lg" onClick={handlePrevButtonClick}>Prev</button>
                    <button onClick={handleNextButtonClick} className=" p-1.5 px-3 bg-slate-300 rounded-lg">Next</button>
                </div>
            <button onClick={()=>toggleWordList()} className=" mt-5 p-1.5 px-3 bg-slate-300 rounded-lg">
                {showWordList ? <p>hide wordlist</p>:
                                <p>show wordlist</p>}
            </button>
            </div>
        </div>
      )

}
