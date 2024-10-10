export function getDateFromValue(value: Date | string | undefined) {
  if (value instanceof Date && value.toString() !== "Invalid Date")
    return value;
  if (value === undefined || value === null) return new Date();
  let date: Date | undefined;
  try {
    date = new Date(value);
    if (date.toString() === "Invalid Date") date = undefined;
  } catch (e) {
    date = undefined;
  }

  return date;
}
