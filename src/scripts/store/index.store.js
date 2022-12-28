import createStore from "../redux/create-store";
import { combineReducers } from "../redux/combine-reducers";
// Reducers
import { todoReducer } from "./todo/todo.reducer";

export const store = createStore(
  combineReducers({
    todo: todoReducer,
  })
);
