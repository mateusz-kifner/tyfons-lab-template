"use client";

import { IconCalendar } from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import {
  type CSSProperties,
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { FormInputType } from "./input-type";
import { Controller, useFormContext } from "react-hook-form";
import { useMergedRef } from "@mantine/hooks";
import { format, isValid, parse } from "date-fns";

const triggerInputChange = (node: HTMLInputElement, inputValue: string) => {
  const descriptor = Object.getOwnPropertyDescriptor(node, "value");

  node.value = `${inputValue}#`;
  if (descriptor?.configurable) {
    // biome-ignore lint/performance/noDelete: <explanation>
    delete node.value;
  }
  node.value = inputValue;

  const e = document.createEvent("HTMLEvents");
  e.initEvent("change", true, false);
  node.dispatchEvent(e);

  if (descriptor) {
    Object.defineProperty(node, "value", descriptor);
  }
};

interface FormDateProps
  extends FormInputType,
    InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
  submitOnChange?: boolean;
}

const FormDate = forwardRef<HTMLInputElement, FormDateProps>((props, ref) => {
  const {
    leftSection,
    rightSection,
    name,
    onChange,
    onBlur,
    required,
    disabled,
  } = props;
  const methods = useFormContext();
  const { control } = methods;
  // const [forceChange, setForceChange] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(ref, inputRef);
  const uuid = useId();

  if (name === undefined) {
    throw new Error("name is required");
  }

  const date = methods.watch(name);

  const inputId = useId();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState("");

  /**
   * Function to handle the DayPicker select event: update the input value and
   * the selected date, and set the month.
   */
  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      if (inputRef.current)
        triggerInputChange(inputRef.current, format(date, "MM/dd/yyyy"));
      setMonth(date);
      setInputValue(format(date, "MM/dd/yyyy"));
    }
  };

  /**
   * Handle the input change event: parse the input value to a date, update the
   * selected date and set the month.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      onChange?.(e);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label htmlFor={inputId}>
            <strong>Date:</strong>
          </label>
          <input
            style={{ fontSize: "inherit", padding: "0.25em 0.5em" }}
            id={inputId}
            type="text"
            value={inputValue}
            placeholder="MM/dd/yyyy"
            onChange={(e) => {
              handleInputChange(e);
              field.onChange(e);
            }}
            name={name}
            ref={mergedRef}
          />
          <div style={{ marginBlock: "1em" }}>
            <Calendar
              month={month}
              onMonthChange={setMonth}
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
              footer={`Selected: ${selectedDate?.toDateString()}`}
            />
          </div>
        </div>
      )}
    />
  );
});

FormDate.displayName = "FormDate";

export default FormDate;
