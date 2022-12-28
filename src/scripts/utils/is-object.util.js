import { kindOf } from "./kind-of.util";

export function isObject(inp) {
  return kindOf(inp) === "object";
}
