import { shapeAssertionReducers } from "./shape-assertion-reducers";
// Utilities
import { isFunction } from "../utils/is-function.util";

export function combineReducers(reducers) {
  const finalReducers = {};

  for (const reducerKey in reducers) {
    const reducer = reducers[reducerKey];

    if (isFunction(reducer)) {
      finalReducers[reducerKey] = reducer;
    }
  }

  let shapeError;
  try {
    shapeAssertionReducers(finalReducers);
  } catch (e) {
    shapeError = e;
  }

  return (state = {}, action) => {
    if (shapeError) {
      throw shapeError;
    }

    let hasChanged = false;
    const nextState = state;
    if (action.type === "@INIT" || action.target === "*") {
      for (const reducerKey in finalReducers) {
        const reducer = finalReducers[reducerKey];
        const reducerState = state[reducerKey] || undefined;
        delete action.target;
        const newReducerState = reducer(reducerState, action);

        if (typeof newReducerState === "undefined") {
          throw new Error(
            `Reducer ${reducerKey} returns undefined for action's type ${action.type}.`
          );
        }

        hasChanged = hasChanged || reducerState !== newReducerState;

        nextState[reducerKey] = newReducerState;
      }
    } else {
      const reducerKey = action.target;
      if (!(reducerKey in finalReducers)) {
        throw new Error(`Target ${reducerKey} not found in reducers`);
      }
      const reducer = finalReducers[reducerKey];
      const reducerState = state[reducerKey] || undefined;
      delete action.target;
      const newReducerState = reducer(reducerState, action);

      if (typeof newReducerState === "undefined") {
        throw new Error(
          `Reducer ${reducerKey} returns undefined for action's type ${action.type}.`
        );
      }

      hasChanged = reducerState !== newReducerState;

      if (hasChanged) nextState[reducerKey] = newReducerState;
    }

    return hasChanged ? nextState : state;
  };
}
