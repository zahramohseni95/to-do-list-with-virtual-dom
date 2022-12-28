// Exceptions
import { ActionHasNoTarget } from "./exceptions/action-has-no-target.exception";
import { ActionHasNoType } from "./exceptions/action-has-no-type.exception";
import { ActionIsNotAnObject } from "./exceptions/action-is-not-an-object.exception";
// Utilities
import { kindOf } from "../utils/kind-of.util";
import { isObject } from "../utils/is-object.util";
import { isFunction } from "../utils/is-function.util";

export default function createStore(reducer, initialState) {
  if (!isFunction(reducer)) {
    throw new Error(
      `Reducer should be a function, but got "${kindOf(reducer)}"`
    );
  }

  if (isFunction(initialState)) {
    throw new Error("InitialState couldn't be a function");
  }
  let state = initialState;
  let followers = [];
  let isDispatching = false;

  function dispatch(action) {
    if (!isObject(action)) {
      throw new ActionIsNotAnObject(action);
    }

    if (!("type" in action)) {
      throw new ActionHasNoType();
    }

    const isInitType = action.type === "@INIT";
    if (!isInitType && !("target" in action)) {
      throw new ActionHasNoTarget();
    }

    if (isDispatching) {
      throw new Error("Couldn't handle any other actions while processing");
    }

    try {
      isDispatching = true;
      state = reducer(state, action);
    } finally {
      isDispatching = false;
      broadcast();
    }
  }

  function broadcast() {
    for (const follow of followers) {
      follow();
    }
  }

  function getState() {
    if (isDispatching) {
      throw new Error(
        "Some Reducers may updating and are busy. please wait..."
      );
    }

    return state;
  }

  function follow(followFn) {
    followers.push(followFn);

    return function unfollow() {
      const nodeIndex = followers.indexOf(followFn);

      if (nodeIndex >= 0) {
        followers.splice(nodeIndex, 1);
      }
    };
  }

  dispatch({
    type: "@INIT",
  });

  return {
    dispatch,
    getState,
    follow,
  };
}
