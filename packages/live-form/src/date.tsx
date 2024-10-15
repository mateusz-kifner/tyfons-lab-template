"use client";

import * as React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { type CSSProperties, useRef } from "react";
import type { VirtualFormField } from "./input-type";
import { useVirtualFormContext } from "./form";
import { getDateFromValue } from "./utils";
import { Label } from "@acme/ui/label";

interface VirtualFormDateProps extends VirtualFormField<string | null> {
  style?: CSSProperties;
}

const VirtualFormDate = (props: VirtualFormDateProps) => {
  const {
    label,
    leftSection,
    rightSection,
    name,
    value,
    onChange,
    required,
    disabled,
    ...moreProps
  } = useVirtualFormContext(props);
  const portalRef = useRef<HTMLDivElement>(null);

  const date = getDateFromValue(value);

  return (
    <div className="flex w-full grow flex-col">
      <div ref={portalRef} />
      <Label label={label} copyValue={value} required={required} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="justify-start gap-1 px-2 text-left font-normal text-gray-300 dark:text-stone-600"
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
        <PopoverContent
          className="w-auto p-0"
          align="start"
          container={portalRef.current}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) =>
              date ? onChange?.(date?.toISOString()) : onChange?.(null)
            }
            {...moreProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default VirtualFormDate;
