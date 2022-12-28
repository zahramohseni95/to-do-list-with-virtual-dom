export function createForm() {
  const formElm = document.createElement("form");
  formElm.classList = "d-flex justify-content-center align-items-center mb-4";

  const { div: divElm, inputElm } = createTextInput();
  const buttonElm = createButtonElm();

  formElm.appendChild(divElm);
  formElm.appendChild(buttonElm);
  return { formElm, inputElm, buttonElm };
}

function createTextInput() {
  const div = document.createElement("div");
  div.classList = "form-outline flex-fill";

  const inputElm = document.createElement("input");
  inputElm.setAttribute("type", "text");
  inputElm.setAttribute("id", "form3");
  inputElm.setAttribute("class", "form-control form-control-lg");
  inputElm.setAttribute("placeholder", "Type something good ^_^");

  // const labelElm = document.createElement("label");
  // labelElm.classList = "form-label";
  // labelElm.htmlFor = "form3";

  div.appendChild(inputElm);
  // div.appendChild(labelElm);
  return { div, inputElm };
}

function createButtonElm() {
  const buttonElm = document.createElement("button");
  buttonElm.setAttribute("type", "submit");
  buttonElm.setAttribute("class", "btn btn-primary btn-lg ms-2");

  buttonElm.textContent = "Add";
  return buttonElm;
}
