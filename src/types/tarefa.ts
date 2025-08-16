export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  criadaEm: Date;
  atualizadaEm: Date;
}

export type TarefaAction =
  | { type: "CARREGAR_TAREFAS"; payload: Tarefa[] }
  | {
      type: "ADICIONAR_TAREFA";
      payload: Omit<Tarefa, "id" | "criadaEm" | "atualizadaEm">;
    }
  | {
      type: "ATUALIZAR_TAREFA";
      payload: { id: string; dados: Partial<Omit<Tarefa, "id" | "criadaEm">> };
    }
  | { type: "REMOVER_TAREFA"; payload: string }
  | { type: "ALTERNAR_CONCLUIDA"; payload: string };

export interface TarefaState {
  tarefas: Tarefa[];
}
