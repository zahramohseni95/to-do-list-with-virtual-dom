export class ActionHasNoType extends Error {
  constructor() {
    super(`Action should have a type.`);
    this.name = "ActionHasNoType";
  }
}
