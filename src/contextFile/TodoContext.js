
import { createContext, useContext, useReducer } from "react";

import Reducer from "../reducer/ReducerFunc";

const TodoContext = createContext([]);

export default function TodoReducer({ children }) {
  const [todos, dispatch] = useReducer(Reducer, []);
  return (
    <>
      <TodoContext.Provider value={{ todos, dispatch }}>
        {children}
      </TodoContext.Provider>
    </>
  );
}

export const useTodos = () => {
  return useContext(TodoContext);
};
