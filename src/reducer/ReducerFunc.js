import { v4 as uuidv4 } from "uuid";

export default function Reducer(currentTodo, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payloud.title,
        details: action.payloud.details,
        isCompleted: false,
      };
      const updateTodo = [...currentTodo, newTodo];
      localStorage.setItem("todo", JSON.stringify(updateTodo));
      return updateTodo;
    }
    case "deleted": {
      const updateTodo = currentTodo.filter((t) => {
        return t != action.payloud;
      });
      localStorage.setItem("todo", JSON.stringify(updateTodo));
      return updateTodo;
    }
    case "Edit": {
      const updateTodo = currentTodo.map((t) => {
        if (t.id == action.payloud.id) {
          return {
            ...action.payloud,
            title: action.payloud.title,
            details: action.payloud.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todo", JSON.stringify(updateTodo));

      return updateTodo;
    }
    case "checkIscompleted": {
      let updateTodo = currentTodo.map((t) => {
        if (action.payloud.id == t.id) {
          const newTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          console.log(action.payloud);

          return newTodo;
        }
        return t;
      });
      localStorage.setItem("todo", JSON.stringify(updateTodo));
      return updateTodo;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
      return storageTodos;
    }

    default: {
      throw Error("this is action Error" + action.type);
    }
  }
}
