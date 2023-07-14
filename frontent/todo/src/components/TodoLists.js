import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useQuery } from "react-query";
import { getLists, removeList } from "../services/api";
import Button from "react-bootstrap/Button";

export const TodoLists = ({ selected, setSelected }) => {
  const [hovered, setHovered] = useState(null);
  const isHovered = (id) => hovered === id;
  const isSelected = (id) => selected === id;

  const queryClient = useQueryClient();
  const removeListMutation = useMutation(removeList, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const removeHandler = (id) => {
    if (window.confirm("Delete this list?")) {
      removeListMutation.mutate(id);
      if (isSelected(id)) {
        setSelected(null);
      }
    }
  };

  const result = useQuery("lists", getLists);

  if (result.isLoading) {
    return "Loading lists...";
  }

  const lists = result.data;

  const getStyle = (id) => {
    const style = {
      // This is to avoid that the list items are jumping when hovering over the items
      // The button is higher than the default height
      lineHeight: "30px",
    };

    if (isSelected(id)) {
      style.fontWeight = "bold";
    }

    if (isHovered(id)) {
      style.textDecoration = "underline";
    }

    return style;
  };

  return (
    <>
      <h2>Lists</h2>
      <ul>
        {lists.map((list) => (
          <li
            key={list.id}
            onMouseEnter={() => setHovered(list.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              style={getStyle(list.id)}
              onClick={() => setSelected(list.id)}
            >
              {list.name}
            </span>
            {isHovered(list.id) && (
              <span>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ padding: "1px", marginLeft: "5px" }}
                  onClick={() => removeHandler(list.id)}
                >
                  remove
                </Button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
