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
    onError: (result) => {
      alert(result.response.data.message);
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
      <Form.Group
        className="mb-3"
        controlId="description"
        style={{ display: "flex" }}
      >
        <Form.Control type="text" placeholder="Enter description" />
        <Button variant="primary" type="submit">
          add
        </Button>
      </Form.Group>
    </Form>
  );
};
