import React from "react";

interface SidebarProps {
  list: { id: number; name: string; word: string; icon?: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({ list }) => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-dvh p-4">
            <p>Word List</p>
            <ul className="space-y-2">
                {list.map((item) => (
                    <li
                    key={item.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                    >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.word}: {item.name}</span>
            </li>
            ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
