"use client";

import * as React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import type { CSSProperties } from "react";
import type { VirtualFormField } from "./input-type";
import { useVirtualFormContext } from "./form";
import { getDateFromValue } from "./utils";

interface FormDateTimeProps extends VirtualFormField<string | null> {
  style?: CSSProperties;
}

const FormDateTime = (props: FormDateTimeProps) => {
  const {
    value,
    onChange,
    disabled,
    required,
    style,
    className,
    leftSection,
    rightSection,
    name,
  } = useVirtualFormContext(props);

  const date = getDateFromValue(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="grow justify-start gap-1 px-2 text-left font-normal text-gray-300 dark:text-stone-600"
        >
          {leftSection ? leftSection : <IconCalendar />}
          <span
            className={cn(
              "grow text-foreground",
              !date && "text-muted-foreground",
            )}
          >
            {date ? format(date, "dd.MM.yyyy") : "Pick a date"}
          </span>
          {rightSection && rightSection}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) =>
            date ? onChange?.(date.toISOString()) : onChange?.(null)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default FormDateTime;
