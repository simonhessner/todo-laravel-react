import { useMutation, useQueryClient } from "react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addList } from "../services/api";

export const TodoListForm = ({ onCreate }) => {
  const queryClient = useQueryClient();

  const newListMutation = useMutation(addList, {
    onSuccess: (result) => {
      queryClient.invalidateQueries("lists");
      onCreate(result.id);
    },
    onError: (result) => {
      alert(result.response.data.message);
    },
  });
  const handler = (event) => {
    event.preventDefault();
    newListMutation.mutate(event.target.listName.value);
    event.target.listName.value = "";
  };

  return (
    <Form onSubmit={handler}>
      <h3>Create list</h3>
      <Form.Group
        className="mb-3"
        controlId="listName"
        style={{ display: "flex" }}
      >
        <Form.Control type="text" placeholder="Enter name" />
        <Button variant="primary" type="submit">
          add
        </Button>
      </Form.Group>
    </Form>
  );
};
