"use client";

import * as React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverAnchor, PopoverContent } from "@acme/ui/popover";
import { useEffect, useState, type CSSProperties } from "react";
import type { LiveFormField } from "./input-type";
import { useLiveFormContext } from "./form";
import { convertDateWithValidation, getDateFromValue } from "./utils";
import { useClickOutside } from "@mantine/hooks";
import { Label } from "@acme/ui/label";

interface FormDateProps extends LiveFormField<string | null> {
  style?: CSSProperties;
}

const FormDate = (props: FormDateProps) => {
  const {
    label,
    value,
    onChange,
    disabled,
    required,
    style,
    className,
    leftSection = <IconCalendar />,
    rightSection,
    name,
  } = useLiveFormContext(props);

  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const { date: date_obj, error } = convertDateWithValidation(value ?? "");
  const [month, setMonth] = React.useState<Date>(date_obj ?? new Date());

  useEffect(() => {
    if (date_obj) setMonth(date_obj);
  }, [value]);

  return (
    <div ref={ref}>
      <Label label={label} copyValue={value} required={required} />

      <Popover open={open}>
        <PopoverAnchor asChild>
          <div
            data-state={open ? "open" : "closed"}
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-2 text-gray-300 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:text-stone-400 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring data-[state=open]:ring-2 dark:text-stone-600 dark:has-[:focus-visible]:text-stone-500",
              error
                ? "has-[:focus-visible]:ring-yellow-500 data-[state=open]:ring-yellow-500"
                : undefined,
            )}
          >
            {!!leftSection && leftSection}
            <input
              type="text"
              disabled={disabled}
              value={value}
              className={cn(
                "flex h-10 w-full bg-transparent text-sm text-stone-800 outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none dark:text-stone-200",
              )}
              onFocus={(e) => {
                setOpen(true);
                e.target.focus();
              }}
              onChange={(e) => onChange?.(e.target.value)}
              // {...moreProps}
            />
            {!!rightSection && rightSection}
          </div>
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
            autoFocus={false}
            selected={date_obj}
            onSelect={(date) =>
              date ? onChange(format(date, "dd.MM.yyyy")) : onChange("")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormDate;

// return (
//   <div className="flex w-full grow flex-col">
//     <Label label={label} copyValue={value} required={required} />
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className="grow justify-start gap-1 px-2 text-left font-normal text-gray-300 dark:text-stone-600"
//         >
//           {leftSection ? leftSection : <IconCalendar />}
//           <span
//             className={cn(
//               "grow text-foreground",
//               !date && "text-muted-foreground",
//             )}
//           >
//             {date ? format(date, "dd.MM.yyyy") : "Pick a date"}
//           </span>
//           {rightSection && rightSection}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={(date) =>
//             date ? onChange?.(date.toISOString()) : onChange?.(null)
//           }
//         />
//       </PopoverContent>
//     </Popover>
//   </div>
// );
