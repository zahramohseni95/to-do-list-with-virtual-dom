import { createElement } from "./createElement";

export const todoNode = (todos) =>
  createElement("ul", {
    props: {
      class: "list-group mb-0",
    },
    children: todos.map((todo) => {
      ////////////////map
      // li
      return createElement("li", {
        props: {
          id: todo.id,
          class:
            "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2",
        },
        children: [
          // div
          createElement("div", {
            props: {
              class: "d-flex align-items-center",
            },
            children: [
              // checkbox
              createElement("input", {
                props: {
                  type: "checkbox",
                  class: "form-check-input me-2",
                  value: todo.done,
                  check:todo.done,
                  click: "",
                },
              }),
              //todo text
              todo.done
                ? createElement("del", {
                    props: {
                      id: "a1",
                    },
                    children: [todo.description],
                  })
                : todo.description,
            ],
          }),
        ],
      });
    }),
  });
