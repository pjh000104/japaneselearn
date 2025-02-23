"use client"

import Link from "next/link";
import { searchWordSet } from "../actions"
import { useState, useEffect } from "react";
export default function Page() {
    const [wordlist, setWordlist] = useState<{id: string, userId: string, title: string}[]>([]);
    useEffect (()=> {
        async function fetchdata () {
            try {
                const response = await searchWordSet();
                setWordlist(response.wordlist);
            }
            catch(error) {
                console.error("error",error)
            }
        }
        fetchdata();
    },[])

    return(
        <div className="flex flex-col">
            <p>hello</p>
            {wordlist.map((list)=> (
            <div key={list.id}>
                <Link href={`/userMemorize?q=${list.id}`}>{list.title}</Link>
            </div>
            ))}
        </div>

    )
}
