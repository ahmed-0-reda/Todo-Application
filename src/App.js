import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TodoReducer from "./contextFile/TodoContext";
import { ToastProvider } from "./contextFile/ToastContext";

// ==============

export default function App() {
  const myTheme = createTheme({
    typography: {
      fontFamily: ["mainFont"],
    },
    palette: {
      primary: {
        main: "#42476d",
        toggle: "#ffe4b596",
        icons: "#5d54a4",
        iconsBg: "#b4ffd8",
        completeTodo: "",
        inputTodo: "#ffffff40",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <TodoReducer>
        <ToastProvider>
          <div className="App" style={{ color: "#fff" }}>
            <ToDoList />
          </div>
        </ToastProvider>
      </TodoReducer>
    </ThemeProvider>
  );
}
