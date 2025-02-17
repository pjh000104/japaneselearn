import Link from "next/link";
import React from "react";

interface SidebarProps {
  list: { id: number; english: string; romaji: string; icon?: React.ReactNode }[];
  onDelete: (id: number) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ list, onDelete }) => {

    const handleNavigate = (list: object[]) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("wordList", JSON.stringify(list)); // Save list in localStorage
        }
    };

    return (
        <aside className="w-64 bg-gray-800 text-white h-dvh p-4 overflow-auto">
            <p>Word List</p>
            <button onClick={() => handleNavigate(list)}>
                <Link href="/memorize">Go to Memorize</Link>
            </button>
            <ul className="space-y-2">
                {list.map((item) => (
                <li
                    key={item.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                >
                    <div className="flex items-center space-x-2">
                    {item.icon && <span>{item.icon}</span>}
                    <span>
                        {item.english}: {item.romaji}
                    </span>
                    </div>
                    <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                    Delete
                    </button>
                </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
