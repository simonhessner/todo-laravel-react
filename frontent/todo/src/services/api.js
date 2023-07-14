import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const getLists = () => {
  return axios.get(`${baseUrl}/list/`).then((res) => res.data);
};

export const addList = (name) => {
  return axios.post(`${baseUrl}/list/`, { name }).then((res) => res.data);
};

export const getList = (id) => {
  return axios.get(`${baseUrl}/list/${id}`).then((res) => {
    return res.data;
  });
};

export const removeList = (id) => {
  return axios.delete(`${baseUrl}/list/${id}`).then((res) => {
    return res.data;
  });
};

export const addTodo = ({ id, description }) => {
  return axios
    .post(`${baseUrl}/list/${id}/todo`, { description })
    .then((res) => res.data);
};

export const deleteTodo = (listId, todoId) => {
  return axios
    .delete(`${baseUrl}/list/${listId}/todo/${todoId}`)
    .then((res) => {
      return res.data;
    });
};

export const updateTodo = (todo) => {
  const listId = todo.todo_list_id;
  const todoId = todo.id;

  return axios
    .put(`${baseUrl}/list/${listId}/todo/${todoId}`, todo)
    .then((res) => {
      return res.data;
    });
};
