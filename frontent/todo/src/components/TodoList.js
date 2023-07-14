import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { getList } from "../services/api";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { AiFillCheckCircle, AiFillCloseSquare } from "react-icons/ai";
import { updateTodo } from "../services/api";

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

  if (result.isLoading) {
    return "Loading...";
  }

  const todos = result.data.todos;
  const name = result.data.name;

  if (todos.length === 0) {
    return (
      <>
        <h2>{name}</h2>
        Empty list
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
                  onClick={() => {
                    console.log(todo.id);
                    toggleStatus(todo);
                  }}
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
