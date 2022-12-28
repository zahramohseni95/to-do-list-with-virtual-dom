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
              class: "d-flex align-items-center w-100",
            },
            children: [
              // checkbox
              createElement("input", {
                props: {
                  type: "checkbox",
                  class: "form-check-input me-2 p-2",
                  value: todo.done,
                  check: todo.done,
                  click: "checkbox",
                },
              }),
              //todo text
              todo.done
                ? createElement("del", {
                    props: {
                      class:"flex-grow-1",
                    },
                    children: [todo.description],
                  })
                : createElement("p", {
                    props: {
                      class:"flex-grow-1 mb-0",
                    },
                    children: [todo.description],
                  }),
              //delete button
              createElement("button", {
                props: {
                  class: "btn btn-outline-primary",
                  click: "delete",
                },
                children: ["X"],
              }),
            ],
          }),
        ],
      });
    }),
  });
