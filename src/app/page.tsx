import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import Link from "next/link";
import { CheckSquare, Plus, Edit, Trash2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Gerenciador de Tarefas</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Atividade de criação de CRUD de tarefas com armazenamento em localStorage
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Desenvolvido com React, useReducer e shadcn/ui
            </p>
            <Button
              asChild
              size="lg"
              className="flex items-center gap-2 w-fit mx-auto"
            >
              <Link href="/tarefas">
                <CheckSquare className="w-5 h-5" />
                Acessar Tarefas
              </Link>
            </Button>
          </section>
        </div>
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
