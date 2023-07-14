import { useMutation, useQueryClient } from "react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addTodo } from "../services/api";

export const TodoForm = ({ id }) => {
  const queryClient = useQueryClient();

  const newTodoMutation = useMutation(addTodo, {
    onSuccess: (result) => {
      queryClient.invalidateQueries(["list", id]);
    },
  });
  const handler = (event) => {
    event.preventDefault();

    newTodoMutation.mutate({
      id,
      description: event.target.description.value,
    });
    event.target.description.value = "";
  };

  return (
    <Form onSubmit={handler}>
      <h3>Create todo in selected list</h3>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Task description</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        add
      </Button>
    </Form>
  );
};
