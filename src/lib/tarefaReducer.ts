import { Tarefa, TarefaAction, TarefaState } from "@/types/tarefa";

export const tarefaReducer = (
  state: TarefaState,
  action: TarefaAction
): TarefaState => {
  switch (action.type) {
    case "CARREGAR_TAREFAS":
      return {
        ...state,
        tarefas: action.payload,
      };

    case "ADICIONAR_TAREFA": {
      const novaTarefa: Tarefa = {
        ...action.payload,
        id: crypto.randomUUID(),
        criadaEm: new Date(),
        atualizadaEm: new Date(),
      };

      const novasTarefas = [...state.tarefas, novaTarefa];
      salvarNoLocalStorage(novasTarefas);

      return {
        ...state,
        tarefas: novasTarefas,
      };
    }

    case "ATUALIZAR_TAREFA": {
      const tarefasAtualizadas = state.tarefas.map((tarefa) =>
        tarefa.id === action.payload.id
          ? { ...tarefa, ...action.payload.dados, atualizadaEm: new Date() }
          : tarefa
      );

      salvarNoLocalStorage(tarefasAtualizadas);

      return {
        ...state,
        tarefas: tarefasAtualizadas,
      };
    }

    case "REMOVER_TAREFA": {
      const tarefasFiltradas = state.tarefas.filter(
        (tarefa) => tarefa.id !== action.payload
      );
      salvarNoLocalStorage(tarefasFiltradas);

      return {
        ...state,
        tarefas: tarefasFiltradas,
      };
    }

    case "ALTERNAR_CONCLUIDA": {
      const tarefasAlteradas = state.tarefas.map((tarefa) =>
        tarefa.id === action.payload
          ? {
              ...tarefa,
              concluida: !tarefa.concluida,
              atualizadaEm: new Date(),
            }
          : tarefa
      );

      salvarNoLocalStorage(tarefasAlteradas);

      return {
        ...state,
        tarefas: tarefasAlteradas,
      };
    }

    default:
      return state;
  }
};

// Função para salvar no localStorage
const salvarNoLocalStorage = (tarefas: Tarefa[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
};

// Função para carregar do localStorage
export const carregarDoLocalStorage = (): Tarefa[] => {
  if (typeof window !== "undefined") {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      return JSON.parse(tarefasSalvas).map((tarefa: any) => ({
        ...tarefa,
        criadaEm: new Date(tarefa.criadaEm),
        atualizadaEm: new Date(tarefa.atualizadaEm),
      }));
    }
  }
  return [];
};

// Função auxiliar para buscar tarefa por ID
export const buscarTarefaPorId = (id: string): Tarefa | null => {
  const tarefas = carregarDoLocalStorage();
  return tarefas.find((tarefa) => tarefa.id === id) || null;
};
