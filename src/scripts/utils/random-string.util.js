export function randomString(len = 5) {
  return Math.random().toString(16).slice(2).slice(0, len);
}
