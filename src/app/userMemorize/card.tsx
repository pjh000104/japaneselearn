import { useEffect, useState } from "react"

export default function Card({english, romaji, index, length} : { english: string, romaji: string, index: number, length: number }) {
    const [flip,setFlip] = useState(false);
    useEffect(()=>{
        if (flip){
            setFlip(!flip);
        }

    },[english])

    return (
        <div onClick={()=>setFlip(!flip)} className="text-3xl w-52 h-52 border-black bg-slate-500 flex justify-between items-center 
                        flex-col rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,0.2)] p-5">
            <div></div>
            {flip ? romaji : english }
            <p className="text-xl text-gray-700">{index+1}/{length}</p>
        </div>
    )
}