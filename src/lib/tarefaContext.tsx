import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { tarefaReducer, carregarDoLocalStorage } from "@/lib/tarefaReducer";
import { TarefaState, TarefaAction } from "@/types/tarefa";

interface TarefaContextType {
  state: TarefaState;
  dispatch: React.Dispatch<TarefaAction>;
}

const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

const estadoInicial: TarefaState = {
  tarefas: [],
};

export function TarefaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);

  useEffect(() => {
    const tarefasCarregadas = carregarDoLocalStorage();
    dispatch({ type: "CARREGAR_TAREFAS", payload: tarefasCarregadas });
  }, []);

  return (
    <TarefaContext.Provider value={{ state, dispatch }}>
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefas() {
  const context = useContext(TarefaContext);
  if (context === undefined) {
    throw new Error("useTarefas deve ser usado dentro de um TarefaProvider");
  }
  return context;
}
