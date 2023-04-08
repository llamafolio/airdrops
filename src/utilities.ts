export function dateHygene(date: string) {
  const valid = new Date(date).toString() !== "Invalid Date";
  if (!valid) throw new Error(`Invalid date: ${date}`);
  return new Date(date).toISOString();
}

export function stringToObject<T>(_string: string) {
  const [[key, value]] = Object.entries(JSON.parse(_string)) as Array<
    [keyof T, string]
  >;
  return { key, value };
}
