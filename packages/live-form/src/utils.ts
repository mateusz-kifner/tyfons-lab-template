import { parse, parseISO } from "date-fns";

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

const plDateRegex = /^(0{0,1}[1-9]|[12]\d|3[01])\.(0{0,1}[1-9]|1[0-2])\.\d{4}$/;
const isoDateOnlyRegex =
  /^\d{4}-(0{0,1}[1-9]|1[0-2])-(0{0,1}[1-9]|[12]\d|3[01])$/;

export function convertDateWithValidation(date_str: string) {
  let error = false;

  if (!(plDateRegex.test(date_str) || isoDateOnlyRegex.test(date_str)))
    error = true;

  const date = !error ? convertToDate(date_str) : undefined;
  if (date === undefined) error = true;

  return { date, error };
}

export function convertToDate(dateStr: string) {
  let date: Date;

  try {
    date = parseISO(dateStr);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    //noop
  }

  try {
    date = parse(dateStr, "dd.MM.yyyy", new Date());
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}
