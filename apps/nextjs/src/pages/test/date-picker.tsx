"use client";

import * as React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/popover";
import { Input } from "@acme/ui/input";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref}>
      <Popover open={open}>
        <PopoverAnchor asChild>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setOpen(true)}
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
            selected={date ? new Date(date) : new Date()}
            onSelect={(date) =>
              date ? setDate(format(date, "yyyy-MM-dd")) : setDate("")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
