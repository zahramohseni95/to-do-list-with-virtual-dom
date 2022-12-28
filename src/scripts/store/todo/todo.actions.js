import { ADD_TASK, TOGGLE_TASK_STATUS } from "./todo.constants";

export const addTodo = (description) => {
  return {
    type: ADD_TASK,
    target: "todo",
    payload: {
      description,
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
