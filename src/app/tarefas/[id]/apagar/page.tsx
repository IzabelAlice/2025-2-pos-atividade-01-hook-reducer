"use client";

import { Header } from "@/components/header";
import { useState, useEffect, useReducer } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { tarefaReducer, carregarDoLocalStorage } from "@/lib/tarefaReducer";
import { TarefaState, Tarefa } from "@/types/tarefa";

const estadoInicial: TarefaState = {
  tarefas: [],
};

export default function ApagarTarefaPage() {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
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
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (!tarefa) {
      alert("Tarefa não encontrada!");
      return;
    }

    if (
      confirm(
        "Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
      )
    ) {
      dispatch({
        type: "REMOVER_TAREFA",
        payload: tarefa.id,
      });
      router.push("/tarefas");
    }
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
            <h2 className="text-2xl font-semibold">Excluir Tarefa</h2>
          </div>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Confirmar Exclusão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Você está prestes a excluir a seguinte tarefa:
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Título</Label>
                      <Input
                        value={tarefa.titulo}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>

                    {tarefa.descricao && (
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea
                          value={tarefa.descricao}
                          readOnly
                          rows={3}
                          className="bg-gray-50"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Input
                          value={tarefa.concluida ? "Concluída" : "Pendente"}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Criada em</Label>
                        <Input
                          value={tarefa.criadaEm.toLocaleDateString("pt-BR")}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Atenção:</strong> Esta ação não pode ser desfeita. A
                    tarefa será permanentemente removida.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Link href="/tarefas">
                    <Button variant="outline">Cancelar</Button>
                  </Link>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Confirmar Exclusão
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
