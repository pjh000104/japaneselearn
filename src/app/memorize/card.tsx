export default function Card({question} : { question: string }) {
    return (
        <div className=" w-52 h-52 border-black bg-slate-500 flex justify-center items-center">
            {question}
        </div>
    )
}