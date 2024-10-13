"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { DayPicker, type DropdownProps } from "react-day-picker";

import { cn } from ".";
import { Button, buttonVariants } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { format, setMonth } from "date-fns";
import { type ChangeEvent, useRef, useState } from "react";
import { Portal } from "@radix-ui/react-portal";

function CalendarDropdown({
  options,
  value,
  onChange,
  container,
  ...moreProps
}: DropdownProps & { container: HTMLDivElement | null }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options?.find(({ value: v }) => v === value);
  const months = Array.from({ length: 12 }, (_, index) =>
    format(setMonth(new Date(), index), "LLL"),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-7 font-medium text-sm first:rounded-r-none first:pr-1 last:rounded-l-none last:pl-1"
          size="sm"
          variant="ghost"
          onClick={() => setOpen(!open)}
        >
          {selectedOption?.label}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="absolute grid h-full w-full grid-cols-3 border-none"
        container={container}
        hideOverlay
      >
        {options?.map(({ label, disabled, value }) => (
          <Button
            variant="ghost"
            key={value}
            size="lg"
            className="text-xs"
            disabled={disabled}
            onClick={() => {
              const event = {
                target: { value },
              } as unknown as ChangeEvent<HTMLSelectElement>;
              onChange?.(event);
              setOpen(false);
            }}
          >
            {label}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative" ref={ref}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout="dropdown"
        className={cn("p-3", className)}
        classNames={{
          months: "relative",
          month: "pt-9",
          weekdays: "flex justify-around",
          dropdowns: "flex absolute top-1 left-1/2 -translate-x-1/2",
          // month_caption:
          //   "absolute top-1 left-1/2 -translate-x-1/2 bg-red-500 h-7 w-44 flex items-center justify-center",
          // // caption_label: "text-sm font-medium",
          nav: "absolute top-1 right-0 left-0 flex items-center justify-between",
          button_next: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          button_previous: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          week: "flex justify-around",
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          ),
          range_end: "rounded-md range-end",
          selected:
            "rounded-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          today: "rounded-md bg-accent text-accent-foreground",
          outside:
            "rounded-md day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          disabled: "rounded-md text-muted-foreground opacity-50",
          range_middle:
            "rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: ({ ...props }) =>
            props.orientation === "left" ? (
              <IconChevronLeft className="h-4 w-4" />
            ) : (
              <IconChevronRight className="h-4 w-4" />
            ),
          Dropdown: ({ ...props }) => (
            <CalendarDropdown {...props} container={ref.current} />
          ),
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
