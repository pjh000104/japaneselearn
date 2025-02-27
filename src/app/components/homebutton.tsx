import Link from "next/link";

export default function HomeButton() {
    return(
        <Link href="/" className="bg-gray-800 p-2 text-white rounded hover:bg-gray-600 h-1/2">Home</Link>
    )
}