"use client";

import { Header } from "@/components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { tarefaReducer, carregarDoLocalStorage } from "@/lib/tarefaReducer";
import { useReducer, useEffect } from "react";
import { TarefaState } from "@/types/tarefa";

const estadoInicial: TarefaState = {
  tarefas: [],
};

export default function NovaTarefaPage() {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tarefasCarregadas = carregarDoLocalStorage();
    dispatch({ type: "CARREGAR_TAREFAS", payload: tarefasCarregadas });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    dispatch({
      type: "ADICIONAR_TAREFA",
      payload: {
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
        concluida: false,
      },
    });

    router.push("/tarefas");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/tarefas">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h2 className="text-2xl font-semibold">Nova Tarefa</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Criar Nova Tarefa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={titulo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitulo(e.target.value)
                    }
                    placeholder="Digite o título da tarefa..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescricao(e.target.value)
                    }
                    placeholder="Digite uma descrição para a tarefa..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Link href="/tarefas">
                    <Button variant="outline">Cancelar</Button>
                  </Link>
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Tarefa
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
