import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const baseUrl = "http://localhost:8000/api";

const TodoListCollection = ({ selected, setSelected }) => {
  const [lists, setLists] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/list/`).then((response) => {
      setLists(response.data);
    });
  }, []);

  if (lists === null) {
    return "Loading lists...";
  }

  const getStyle = (id) => {
    const style = {};

    if (selected === id) {
      style.fontWeight = "bold";
    }

    if (hovered === id) {
      style.textDecoration = "underline";
    }

    return style;
  };

  return (
    <div>
      <h2>Lists</h2>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <span
              style={getStyle(list.id)}
              onClick={() => setSelected(list.id)}
              onMouseEnter={() => setHovered(list.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {list.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TodoList = ({ id }) => {
  const [todos, setTodos] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/list/${id}`).then((result) => {
      setTodos(result.data.todos);
      setName(result.data.name);
    });
  }, [id]);

  if (todos === null) {
    return "Loading...";
  }

  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-3xl">Todo app</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoListCollection selected={selected} setSelected={setSelected} />
        </Col>
        <Col>
          {(selected && <TodoList id={selected} />) ||
            "Select or add a list on the left"}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
