import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex justify-center align-middle">
      <Link className="text-5xl"href="/practicepage">Click to Start App!</Link>
    </div>
  );
}
