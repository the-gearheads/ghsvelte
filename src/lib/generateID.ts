/* Generates a 6 character alphanumeric id */
export function generateID(): string {
  return Math.random().toString(36).substring(2, 8);
}