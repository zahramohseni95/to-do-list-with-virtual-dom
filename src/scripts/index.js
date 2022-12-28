// DOM Utilities
import { createForm } from "./dom/form.dom";
import { todoNode } from "./dom/todo.dom";
import { hyperRender } from "./dom/hyper-render";
import { mount } from "./dom/mount";
// Store
import { store } from "../scripts/store/index.store";
// Actions
import { addTodo } from "./store/todo/todo.actions";
import { render } from "./dom/render.dom";

window.onload = function () {
  const divFormElement = document.querySelector("#form-element");
  const { formElm, buttonElm, inputElm } = createForm();

  divFormElement.replaceWith(formElm);

  buttonElm.addEventListener("click", (e) => {
    e.preventDefault();

    const value = inputElm.value.trim() || "";
    if (value) {
      store.dispatch(addTodo(value));
      inputElm.value = "";
    }
  });


  const firstState = store.getState().todo;
  let ulElm = todoNode(firstState); //obj 
  const $ul = hyperRender(ulElm); // tag

  const listElement = document.getElementById("list-element");
  let $rootEl = mount($ul, listElement);
  const unfollow = store.follow(function () {

    const newState = store.getState().todo;
    const newUlElm = todoNode(newState); //obj 

    const patch = renderToUniformList(ulElm, newUlElm);

    $rootEl = patch($rootEl);
    ulElm = newUlElm;
  });
};

function renderToUniformList(ulElm1, newUlElm1) {

  return render(ulElm1, newUlElm1);
}
