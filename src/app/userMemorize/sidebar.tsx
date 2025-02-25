import { deleteWord } from "../actions";
interface SidebarProps {
    wordList: {
        english: string;
        romaji: string;
        wordId: number;
    }[];
    wordListId: string;
}
export default function Sidebar({wordList, wordListId} : SidebarProps) {
    async function onDelete(wordId: number) {
        try{
            await deleteWord(wordListId, wordId);
            window.location.reload();
        } catch(error) {
            console.error("error occured: ", error);
        }
    }
    return (
        <aside className="w-64 bg-gray-800 text-white h-dvh p-4 overflow-auto">
            <p>Word List</p>

            <ul className="space-y-2">
                {wordList.map((item) => (
                <li
                    key={item.wordId}
                    className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                >
                    <div className="flex items-center space-x-2">
                    <span>
                        {item.english}: {item.romaji}
                    </span>
                    </div>
                    <button
                    onClick={() => onDelete(item.wordId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                    Delete
                    </button>
                </li>
                ))}
            </ul>
        </aside>
        )
}