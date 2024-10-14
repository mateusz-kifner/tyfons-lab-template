"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { DayPicker, type DropdownProps } from "react-day-picker";

import { cn } from ".";
import { Button, buttonVariants } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { format, setMonth } from "date-fns";
import { type ChangeEvent, useId, useRef, useState } from "react";
import { Portal } from "@radix-ui/react-portal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "./scroll-area";

function CalendarDropdown({
  options,
  value,
  onChange,
  container,
  ...moreProps
}: DropdownProps & { container: HTMLDivElement | null }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options?.find(({ value: v }) => v === value);
  const uuid = useId();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-7 font-medium text-sm first:rounded-r-none first:pr-2 last:rounded-l-none last:pl-2"
          size="sm"
          variant="ghost"
          onClick={() => setOpen(!open)}
        >
          {selectedOption?.label}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="absolute h-full w-full border-none"
        container={container}
        hideOverlay
        hideCloseButton
      >
        <VisuallyHidden>
          <DialogTitle>
            {Number.isNaN(Number.parseInt(selectedOption?.label as any))
              ? "Months select"
              : "Year select"}
          </DialogTitle>
          <DialogDescription />
        </VisuallyHidden>
        <ScrollArea type="auto">
          <div
            className={cn(
              "grid min-h-full grid-cols-3 gap-2",
              (options?.length ?? 0) > 12 && "pr-3",
            )}
          >
            {options?.map((option) => (
              <Button
                variant={option.value === value ? "secondary" : "ghost"}
                key={option.value}
                ref={option.value === value ? ref : undefined}
                size="lg"
                className="text-xs"
                disabled={option.disabled}
                onLoad={() =>
                  ref.current?.scrollIntoView({ behavior: "smooth" })
                }
                onClick={() => {
                  const event = {
                    target: { value: option.value },
                  } as unknown as ChangeEvent<HTMLSelectElement>;
                  onChange?.(event);
                  setOpen(false);
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
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
    <div className="relative w-72" ref={ref}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout="dropdown"
        className={cn("p-3", className)}
        startMonth={new Date(1970, 12)}
        endMonth={new Date(2200, 1)}
        classNames={{
          months: "relative",
          month: "pt-9",
          weekdays: "flex justify-around",
          dropdowns: "flex absolute top-1 left-1/2 -translate-x-1/2",
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
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 dark:hover:bg-black/50 hover:bg-black/30   hover:text-white",
          ),
          range_end: "rounded-l-none",
          range_start: "rounded-r-none",
          selected:
            "rounded-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          today: "rounded-md bg-accent text-accent-foreground",
          outside:
            "rounded-md day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          disabled: "rounded-md text-muted-foreground opacity-50",
          range_middle:
            "rounded-none dark:aria-selected:bg-primary/30 aria-selected:bg-primary/50 aria-selected:text-primary-foreground",
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
