import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TodoLists } from "./components/TodoLists";
import { TodoListForm } from "./components/TodoListForm";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";

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
        <Col xs={3}>
          <TodoLists selected={selected} setSelected={setSelected} />
          <TodoListForm onCreate={(id) => setSelected(id)} />
        </Col>
        <Col>
          {(selected && (
            <>
              <Row>
                <TodoList id={selected} />
              </Row>
              <Row>
                <TodoForm id={selected} />
              </Row>
            </>
          )) ||
            "Select or add a list on the left"}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
