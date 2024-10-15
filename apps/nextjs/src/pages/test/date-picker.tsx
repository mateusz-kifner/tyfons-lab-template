"use client";

import * as React from "react";
import { format, parse, parseISO } from "date-fns";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverAnchor, PopoverContent } from "@acme/ui/popover";
import { Input } from "@acme/ui/input";
import { useEffect, useState } from "react";
import { useClickOutside } from "@mantine/hooks";

const plDateRegex = /^(0{0,1}[1-9]|[12]\d|3[01])\.(0{0,1}[1-9]|1[0-2])\.\d{4}$/;
const isoDateOnlyRegex =
  /^\d{4}-(0{0,1}[1-9]|1[0-2])-(0{0,1}[1-9]|[12]\d|3[01])$/;

function convertDateWithValidation(date_str: string) {
  let warning = false;
  let error = false;

  if (!(plDateRegex.test(date_str) || isoDateOnlyRegex.test(date_str)))
    warning = true;

  const date = convertToDate(date_str);
  if (date === undefined) error = true;

  return { date, warning, error };
}

function convertToDate(dateStr: string) {
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

export function DatePickerDemo() {
  const [date, setDate] = React.useState<string>("");

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const { date: date_obj, warning, error } = convertDateWithValidation(date);
  const [month, setMonth] = React.useState<Date>(date_obj ?? new Date());

  useEffect(() => {
    if (date_obj) setMonth(date_obj);
  }, [date]);

  return (
    <div ref={ref} className="p-6">
      <Popover open={open}>
        <PopoverAnchor asChild>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setOpen(true)}
            className={
              warning
                ? "focus-visible:ring-yellow-500"
                : error
                  ? "focus-visible:ring-destructive"
                  : undefined
            }
          />
        </PopoverAnchor>
        <PopoverContent
          className="w-auto p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          container={ref.current}
          align="start"
        >
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={date_obj}
            onSelect={(date) =>
              date ? setDate(format(date, "dd.MM.yyyy")) : setDate("")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerDemo;
