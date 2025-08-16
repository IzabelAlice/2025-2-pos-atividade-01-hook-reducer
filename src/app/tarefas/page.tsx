"use client";

import { Header } from "@/components/header";
import { useReducer, useEffect } from "react";
import { tarefaReducer, carregarDoLocalStorage } from "@/lib/tarefaReducer";
import { TarefaState } from "@/types/tarefa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Plus } from "lucide-react";

const estadoInicial: TarefaState = {
  tarefas: [],
};

export default function TarefasPage() {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);

  useEffect(() => {
    const tarefasCarregadas = carregarDoLocalStorage();
    dispatch({ type: "CARREGAR_TAREFAS", payload: tarefasCarregadas });
  }, []);

  const alternarConcluida = (id: string) => {
    dispatch({ type: "ALTERNAR_CONCLUIDA", payload: id });
  };

  const removerTarefa = (id: string) => {
    dispatch({ type: "REMOVER_TAREFA", payload: id });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Lista de Tarefas</h2>
            <Link href="/tarefas/nova">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </Button>
            </Link>
          </div>

          {state.tarefas.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground text-center mb-4">
                  Nenhuma tarefa encontrada
                </p>
                <Link href="/tarefas/nova">
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar primeira tarefa
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {state.tarefas.map((tarefa) => (
                <Card
                  key={tarefa.id}
                  className={tarefa.concluida ? "opacity-75" : ""}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={tarefa.concluida}
                          onCheckedChange={() => alternarConcluida(tarefa.id)}
                        />
                        <span
                          className={
                            tarefa.concluida
                              ? "line-through text-muted-foreground"
                              : ""
                          }
                        >
                          {tarefa.titulo}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/tarefas/${tarefa.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/tarefas/${tarefa.id}/apagar`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {tarefa.descricao && (
                    <CardContent>
                      <p
                        className={`text-sm ${
                          tarefa.concluida
                            ? "line-through text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {tarefa.descricao}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Criada em: {tarefa.criadaEm.toLocaleDateString("pt-BR")}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
