import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { getList } from "../services/api";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { AiFillCheckCircle, AiFillCloseSquare } from "react-icons/ai";
import { updateTodo, updateList } from "../services/api";
import { RenameForm } from "./RenameForm";

export const TodoList = ({ id }) => {
  const [hovered, setHovered] = useState(null);
  const isHovered = (id) => hovered === id;

  const result = useQuery(["list", id], () => getList(id));

  const queryClient = useQueryClient();
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["list", id]);
    },
  });

  const changeName = (newName) => {
    const newList = {
      name: newName,
    };
    updateListMutation.mutate({ list: newList, id });
  };

  const updateListMutation = useMutation(updateList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["list", id]);
      queryClient.invalidateQueries(["lists"]);
    },
  });

  if (result.isLoading) {
    return "Loading...";
  }

  const todos = result.data.todos;
  const name = result.data.name;

  if (todos.length === 0) {
    return (
      <>
        <RenameForm onUpdate={changeName} />
        <h2>{name}</h2>
        Empty list. Use the form below to add tasks
      </>
    );
  }

  const getStyle = (todo) => {
    const style = {
      // This is to avoid that the list items are jumping when hovering over the items
      // The button is higher than the default height
      lineHeight: "30px",
    };

    if (todo.completed) {
      style.textDecoration = "line-through";
    }

    return style;
  };

  const toggleStatus = (todo) => {
    const newTodo = {
      ...todo,
      completed: !todo.completed,
    };
    updateTodoMutation.mutate(newTodo);
  };

  return (
    <div>
      <RenameForm onUpdate={changeName} />
      <h2>{name}</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onMouseEnter={() => setHovered(todo.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={getStyle(todo)}>{todo.description}</span>
            {isHovered(todo.id) && (
              <>
                <Button
                  variant={todo.completed ? "secondary" : "success"}
                  size="sm"
                  style={{ padding: "1px", marginLeft: "5px" }}
                  onClick={() => toggleStatus(todo)}
                >
                  {todo.completed ? (
                    <AiFillCloseSquare />
                  ) : (
                    <AiFillCheckCircle />
                  )}
                  &nbsp;
                  {todo.completed ? "mark as incomplete" : "mark as complete"}
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
