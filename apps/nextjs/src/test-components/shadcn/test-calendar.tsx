"use client";

import * as React from "react";

import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Button } from "@acme/ui/button";
import { cn } from "@acme/ui";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";

function TestCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [date2, setDate2] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex gap-4 p-4 flex-col">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[240px] pl-3 text-left font-normal")}
          >
            {date2 ? format(date2, "PPP") : <span>Pick a date</span>}

            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date2}
            onSelect={setDate2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TestCalendar;
