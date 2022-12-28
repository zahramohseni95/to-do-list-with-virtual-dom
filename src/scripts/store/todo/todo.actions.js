import { ADD_TASK, TOGGLE_TASK_STATUS, DELETE_TASK } from "./todo.constants";

export const addTodo = (description) => {
  return {
    type: ADD_TASK,
    target: "todo",
    payload: {
      description,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TASK,
    target: "todo",
    payload: {
      id,
    },
  };
};

export const toggleTodoStatus = (id) => {
  return {
    type: TOGGLE_TASK_STATUS,
    target: "todo",
    payload: {
      id,
    },
  };
};
