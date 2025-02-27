
interface SidebarProps {
    wordList: {
        english: string;
        romaji: string;
        wordId: number;
    }[];
}
export default function Sidebar({wordList} : SidebarProps) {

    return (
        <aside className="w-1/5 bg-gray-800 text-white h-dvh p-4 overflow-auto">
            <h1 className="text-xl">Word List</h1>

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
                </li>
                ))}
            </ul>
        </aside>
        )
}