export class ActionHasNoTarget extends Error {
  constructor() {
    super(`Action should have a target.`);
    this.name = "ActionHasNoTarget";
  }
}
