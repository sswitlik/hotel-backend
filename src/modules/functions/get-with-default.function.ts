export function getWithDefault<T>(getter: () => T, defaultValue: T = null): T {
  let result = defaultValue;
  try {
    result = getter();
  } catch (e) {
  }
  return result;
}
