// Constants
import { ADD_TASK, TOGGLE_TASK_STATUS } from "./todo.constants";
// Utilities
import { randomString } from "../../utils/random-string.util";

const initialState = [
  {
    id: randomString(),
    description: "Task 1",
    done: true,
  },
  {
    id: randomString(),
    description: "Task 2",
    done: false,
  },
];
export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      const id = randomString();
      return [...state, Object.assign({}, action.payload, { id, done: false })];
    case TOGGLE_TASK_STATUS: {
      const { id } = action.payload;
      const todoIndex = state.findIndex((todo) => todo.id === id);

      if (todoIndex >= 0) {
        const todo = state[todoIndex];
        todo.done = !todo.done;
      }

      return [...state];
    }
    default:
      return state;
  }
}
