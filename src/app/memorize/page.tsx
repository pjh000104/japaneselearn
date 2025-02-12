"use client"
import  UserContextProvider  from "../practicepage/page";
import React, { useEffect, useState} from "react";
import Card from "./card"

export default function Page() {
    const data = ["abc","ssf"]
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(data[index])

    function handleNextButtonClick() {
        setIndex(index+1);
        setQuestion(data[index+1]);
    }

    const handlePrevButtonClick = () => {
        setIndex(index-1);
        setQuestion(data[index-1]);
    }

    return (
        <div>
            <div className="text-3xl">
                <Card question = {question}/>
            </div>
            <button onClick={handleNextButtonClick}>Next</button>
            <button onClick={handlePrevButtonClick}>Prev</button>
        </div>
    )
}





