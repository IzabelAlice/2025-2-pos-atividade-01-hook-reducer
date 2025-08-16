"use client";

import { Header } from "@/components/header";
import { useState, useEffect, useReducer } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { tarefaReducer, carregarDoLocalStorage } from "@/lib/tarefaReducer";
import { TarefaState, Tarefa } from "@/types/tarefa";

const estadoInicial: TarefaState = {
  tarefas: [],
};

export default function EditarTarefaPage() {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const tarefasCarregadas = carregarDoLocalStorage();
    dispatch({ type: "CARREGAR_TAREFAS", payload: tarefasCarregadas });

    const tarefaEncontrada = tarefasCarregadas.find((t) => t.id === id);
    if (tarefaEncontrada) {
      setTarefa(tarefaEncontrada);
      setTitulo(tarefaEncontrada.titulo);
      setDescricao(tarefaEncontrada.descricao || "");
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    if (!tarefa) {
      alert("Tarefa não encontrada!");
      return;
    }

    dispatch({
      type: "ATUALIZAR_TAREFA",
      payload: {
        id: tarefa.id,
        dados: {
          titulo: titulo.trim(),
          descricao: descricao.trim() || undefined,
        },
      },
    });

    router.push("/tarefas");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <p>Carregando...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!tarefa) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground text-center mb-4">
                  Tarefa não encontrada
                </p>
                <Link href="/tarefas">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para Lista
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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
            <h2 className="text-2xl font-semibold">Editar Tarefa</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Editar Tarefa</CardTitle>
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

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Criada em: {tarefa.criadaEm.toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Última atualização:{" "}
                    {tarefa.atualizadaEm.toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Link href="/tarefas">
                    <Button variant="outline">Cancelar</Button>
                  </Link>
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Atualizar Tarefa
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
