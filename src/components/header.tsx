import Link from "next/link";

export function Header() {
  return (
    <header className="bg-blue-950 py-4 px-6">
      <Link href="/">
        <h1 className="font-semibold text-gray-300">
          Infoweb - Atividade 1 - 2° bimestre
        </h1>
      </Link>
    </header>
  );
}
export default Header;
