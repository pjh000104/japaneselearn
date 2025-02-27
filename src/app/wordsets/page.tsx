"use client"

import Link from "next/link";
import { searchWordSet, getLoginStatus, deleteWordSet } from "../actions"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import HomeButton from "../components/homebutton";
import LoginOutButton
 from "../components/login-logout-button";
export default function Page() {
    const [wordlist, setWordlist] = useState<{id: string, userId: string, title: string}[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect (()=> {
        async function fetchdata () {
            const data = await getLoginStatus();
            if (data.user) {
                setIsLoggedIn(true);
                try {
                    const response = await searchWordSet();
                    setWordlist(response.wordlist);
                }
                catch(error) {
                    console.error("error",error)
                }
            } else {
                setIsLoggedIn(false);
            } 
        }
        fetchdata();
    },[])

    const handleClick = (listid:string) => {
        router.push(`/userMemorize?q=${listid}`);
      };

    async function handdleDelete(wordSetId:string) {
        await deleteWordSet(wordSetId);
        setWordlist((prev) => prev.filter((item) => item.id !== wordSetId));
    }
    if (isLoggedIn === false) {
        return (
            <div>
                <p>Please login</p>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">

            <div className="flex gap-5 absolute top-5 right-10">
                <HomeButton/>
                <LoginOutButton />
            </div>

            <h2 className="text-4xl">My Word Sets</h2>
            {wordlist? 
            wordlist.map((list)=> (
                // <div key={list.id}>
                //     <Link href={`/userMemorize?q=${list.id}`}>{list.title}</Link>
                //     <button onClick={()=>handdleDelete(list.id)}>delete</button>
                // </div>
                <div className="flex gap-2" key={list.id}>
                    <div
                    role="alert"
                    className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100 hover:bg-slate-400 w-60 p-2 px-5 rounded-lg flex justify-between items-center "
                    onClick={()=>handleClick(list.id)}
                    >

                    <Link href={`/userMemorize?q=${list.id}`}>{list.title}</Link>

                    </div>
                    <Link href={`/editwordset?q=${list.id}`} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">edit</Link>
                    <button onClick={()=>handdleDelete(list.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        delete
                    </button>

                </div>
                
                ))
            : <p>Word List Loading...</p>}
        </div>

    )
}

