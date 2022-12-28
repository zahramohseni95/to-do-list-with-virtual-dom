import { store } from "../store/index.store";
import { toggleTodoStatus } from "../store/todo/todo.actions";
import { isString } from "../utils/is-string.util";

const hyperRenderElement = ({ type, props = {}, children = [] }) => {
  if (!type) throw new Error("Property type does not exist");

  const $el = document.createElement(type);

  // set attributes that should be rendered
  for (const [propKey, propValue] of Object.entries(props)) {
    if (propKey === "click") {
      $el.addEventListener("click", (e) => {
        const { id } = e.target.parentNode.parentNode;
        store.dispatch(toggleTodoStatus(id));
      });
    } else if (propKey.startsWith("data")) {
      let propDataKey = propKey.slice(4);
      propDataKey = propDataKey.charAt(0).toLowerCase() + propDataKey.slice(1);

      $el.dataset[propDataKey] = propValue;
    } else if (propKey === "check" && propValue) {
      $el.setAttribute("checked", propValue)
    } else {
      $el.setAttribute(propKey, propValue);
    }
  }

  // set children that should be rendered
  for (const child of children) {
    const $child = hyperRender(child);

    $el.appendChild($child);
  }

  return $el;
};

export const hyperRender = ($node) => {
  if (isString($node)) {
    return document.createTextNode($node);
  }

  return hyperRenderElement($node);
};
