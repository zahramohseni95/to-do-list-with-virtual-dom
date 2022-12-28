export class ActionIsNotAnObject extends Error {
  constructor(action) {
    super(`Action should be an object but got ${kindOf(action)}`);
    this.name = "ActionIsNotAnObject";
  }
}
