export function areEqual<T extends object>(
  prevProps: T,
  nextProps: T,
  keys: (keyof T)[]
): boolean {
  return keys.every((key) => prevProps[key] === nextProps[key]);
}
