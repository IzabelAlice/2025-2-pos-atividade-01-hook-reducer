import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-100">
        <section className="m-auto flex flex-col items-center justify-center gap-4 p-6">
          <h2 className="font-semibold text-2xl text-center">
            Atividade 1 - 2° bimestre
          </h2>
          <h3 className="text-center">hook reducer e shadcnui</h3>
          <Button asChild className="w-65 items-center gap-2 md:flex-row">
            <Link href="/tarefas">Tarefas</Link>
          </Button>
        </section>
      </main>
      <footer className="bg-gray-200 py-4 px-6 text-center text-sm text-gray-600">
        <p>
          GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
          <br />
          <a href="https://fsf.org/" className="hover:text-gray-800 underline">
            Copyright (C) 2007 Free Software Foundation, Inc.
          </a>
        </p>
      </footer>
    </div>
  );
}
