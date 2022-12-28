import { diff } from "./diff";

export function render(ulElm2, newUlElm2) {

  const patch1 = diff(ulElm2, newUlElm2);
  return patch1;
}


