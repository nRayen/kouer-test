import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Rayen NDIAYE</h1>
      <h2 className="text-2xl font-medium">Test Technique alternant développeur web chez Kouer</h2>
      <Link href="/signup" className="text-blue-500">Lien vers le formulaire de création de compte</Link>
    </div>
  );
}
