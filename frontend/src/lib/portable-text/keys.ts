export function ptKey(): string {
  return Math.random().toString(36).slice(2, 14);
}
