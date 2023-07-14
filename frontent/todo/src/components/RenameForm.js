import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const RenameForm = ({ onUpdate }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  if (!show) {
    return (
      <Button
        variant="warning"
        onClick={() => setShow(true)}
        style={{ width: "auto" }}
      >
        Rename list
      </Button>
    );
  }

  const close = () => {
    setName("");
    setShow(false);
  };

  const updateName = (event) => {
    event.preventDefault();
    onUpdate(name);
    close();
  };

  const cancel = (event) => {
    event.preventDefault();
    close();
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Form onSubmit={null}>
      <h4>Rename list</h4>
      <Form.Group className="mb-3" controlId="name" style={{ display: "flex" }}>
        <Form.Control
          type="text"
          placeholder="Enter new name"
          value={name}
          onChange={onChange}
        />
        <Button variant="primary" type="submit" onClick={updateName}>
          rename
        </Button>
        <Button variant="secondary" type="submit" onClick={cancel}>
          cancel
        </Button>
      </Form.Group>
    </Form>
  );
};
