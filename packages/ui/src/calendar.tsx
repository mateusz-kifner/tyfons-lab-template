"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import {
  DayPicker,
  type DropdownOption,
  type DropdownProps,
} from "react-day-picker";

import { cn } from ".";
import { Button, buttonVariants } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { type ChangeEvent, useId, useRef, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "./scroll-area";
import { usePagination } from "@mantine/hooks";

function CalendarDropdown({
  options,
  value,
  ...moreProps
}: DropdownProps & { container: HTMLDivElement | null }) {
  const selectedOption = options?.find(({ value: v }) => v === value);
  const is_month_select = Number.isNaN(
    Number.parseInt(selectedOption?.label as any),
  );
  if (options === undefined) return null;
  if (is_month_select) {
    return (
      <CalendarMonthDropdown
        options={options}
        value={value}
        selectedOption={selectedOption as DropdownOption}
        {...moreProps}
      />
    );
  }

  return (
    <CalendarYearDropdown
      options={options}
      value={value}
      selectedOption={selectedOption as DropdownOption}
      {...moreProps}
    />
  );
}

function CalendarMonthDropdown({
  options,
  value,
  onChange,
  container,
  selectedOption,
  ...moreProps
}: DropdownProps & {
  container: HTMLDivElement | null;
  selectedOption: DropdownOption;
}) {
  const [open, setOpen] = useState(false);
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
        className="absolute flex h-full w-full flex-col justify-start gap-2 border-none p-2 pt-4"
        container={container}
        hideOverlay
        hideCloseButton
      >
        <VisuallyHidden>
          <DialogTitle>Months select</DialogTitle>
          <DialogDescription />
        </VisuallyHidden>
        <Button onClick={() => setOpen(false)} variant="ghost" className="h-7">
          <IconX className="size-4" />
        </Button>

        <div className="grid grow grid-cols-3 gap-1">
          {options?.map((option) => (
            <Button
              variant={option.value === value ? "secondary" : "ghost"}
              key={option.value}
              ref={option.value === value ? ref : undefined}
              className="h-auto text-xs"
              size="lg"
              disabled={option.disabled}
              onLoad={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
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
      </DialogContent>
    </Dialog>
  );
}

function CalendarYearDropdown({
  options,
  value,
  onChange,
  container,
  selectedOption,
  ...moreProps
}: DropdownProps & {
  container: HTMLDivElement | null;
  selectedOption: DropdownOption;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const max_value =
    ((options as any)[(options as any).length - 1].value as
      | number
      | undefined) ?? 0;
  const min_value = ((options as any)[0].value as number | undefined) ?? 0;
  console.log(selectedOption);
  const [page, setPage] = useState(Math.floor(selectedOption.value / 10));
  console.log(page);

  const pageOptions = options?.filter(
    (option) => option.value >= page * 10 && option.value < (page + 1) * 10,
  );
  console.log(value);
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
        className="absolute flex h-full w-full flex-col justify-start gap-2 border-none p-2 pt-4"
        container={container}
        hideOverlay
        hideCloseButton
      >
        <VisuallyHidden>
          <DialogTitle>Year select</DialogTitle>
          <DialogDescription />
        </VisuallyHidden>
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => setPage((p) => p - 1)}
            variant="outline"
            className="size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          >
            <IconChevronLeft className="size-4" />
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="h-7 grow"
          >
            <IconX className="size-4" />
          </Button>
          <Button
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
            className="size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          >
            <IconChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grow grid-cols-2 gap-2">
          {pageOptions?.map((option) => (
            <Button
              variant={option.value === value ? "secondary" : "ghost"}
              key={option.value}
              ref={option.value === value ? ref : undefined}
              size="lg"
              className="h-auto text-xs"
              disabled={option.disabled}
              onLoad={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
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
        startMonth={new Date(1970, 12)}
        endMonth={new Date(2200, 1)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 sm:gap-y-0",
          month: "flex flex-col gap-y-4 pt-9",
          month_caption: "flex justify-center  items-center",
          dropdowns: "flex absolute top-4 left-1/2 -translate-x-1/2",
          dropdown: "flex",
          caption_label: "text-sm font-medium",
          nav: "flex items-center absolute inset-x-0",
          button_previous: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute z-50 left-2 top-1",
          ),
          button_next: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute z-50 right-2 top-1",
          ),
          month_grid: "w-full border-collapse space-y-1",
          weekdays: "flex",
          weekday:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          week: "flex w-full mt-2",
          day: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 aria-selected:bg-primary/50 aria-selected:[&.day-outside]:bg-accent/50",
            props.mode === "range"
              ? "[&.day-range-end]:rounded-r-md [&.day-range-start]:rounded-l-md aria-selected:[&.day-range-end]:rounded-r-md first:aria-selected:rounded-l-md last:aria-selected:rounded-r-md"
              : "aria-selected:rounded-md",
          ),
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "size-8 p-0 font-normal",
          ),
          range_start: "day-range-start",
          range_end: "day-range-end",
          selected:
            "day-selected *:bg-primary *:text-primary-foreground *:hover:bg-primary *:hover:text-primary-foreground *:focus:bg-primary *:focus:text-primary-foreground *:opacity-100",
          today: "*:bg-primary/50 *:text-accent-foreground",
          outside:
            "day-outside *:text-muted-foreground *:opacity-50 *:aria-selected:bg-accent/50 *:aria-selected:text-muted-foreground *:aria-selected:opacity-30",
          disabled: "text-muted-foreground opacity-50",
          range_middle:
            "day-range-middle *:aria-selected:bg-transparent *:aria-selected:text-accent-foreground",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: ({ ...props }) =>
            props.orientation === "left" ? (
              <IconChevronLeft className="size-4" />
            ) : (
              <IconChevronRight className="size-4" />
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
