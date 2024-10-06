"use client";

import * as React from "react";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import {
  type CSSProperties,
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import type { FormInputType } from "./input-type";
import { Controller, useFormContext } from "react-hook-form";

interface FormDateProps
  extends FormInputType,
    InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
}

const FormDate = forwardRef<HTMLInputElement, FormDateProps>((props, ref) => {
  const { leftSection, rightSection } = props;
  const methods = useFormContext();
  const { control } = methods;

  if (props.name === undefined) {
    throw new Error("name is required");
  }
  const date = methods.watch(props.name);

  return (
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
      <PopoverContent className="w-auto p-0" align="start">
        <Controller
          control={control}
          name={props.name}
          render={({ field }) => (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => field.onChange(date)}
              initialFocus
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
});

FormDate.displayName = "FormDate";

export default FormDate;
