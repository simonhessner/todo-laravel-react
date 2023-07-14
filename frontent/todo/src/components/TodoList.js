import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  AiFillCheckCircle,
  AiFillCloseSquare,
  AiFillDelete,
} from "react-icons/ai";
import { updateTodo, updateList, deleteTodo, getList } from "../services/api";
import { RenameForm } from "./RenameForm";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      show
      <Button
        variant="link"
        disabled={filter === "all"}
        onClick={() => setFilter("all")}
      >
        all
      </Button>
      <Button
        variant="link"
        disabled={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        completed
      </Button>
      <Button
        variant="link"
        disabled={filter === "uncompleted"}
        onClick={() => setFilter("uncompleted")}
      >
        uncompleted
      </Button>
    </div>
  );
};

export const TodoList = ({ id }) => {
  const [filter, setFilter] = useState("all");
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

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["list", id]);
    },
  });

  if (result.isLoading) {
    return "Loading...";
  }

  const name = result.data.name;
  let filterFn = {
    completed: (todo) => todo.completed,
    uncompleted: (todo) => !todo.completed,
    all: () => true,
  }[filter];
  let todos = result.data.todos.filter(filterFn);

  const header = (
    <>
      <RenameForm onUpdate={changeName} />
      <Filter {...{ filter, setFilter }} />
    </>
  );

  if (todos.length === 0) {
    return (
      <div>
        <h2>{name}</h2>
        {header}
        Nothing found. Use the form below to add tasks or change the filter
        <br />
        <br />
      </div>
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

  const remove = (todo) => {
    if (window.confirm(`Do you really want do delete '${todo.description}'?`)) {
      deleteTodoMutation.mutate({ listId: id, todoId: todo.id });
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      {header}
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
                <Button
                  variant="danger"
                  size="sm"
                  style={{ padding: "1px", marginLeft: "5px" }}
                  onClick={() => remove(todo)}
                >
                  <AiFillDelete />
                  delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
