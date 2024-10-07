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
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { FormInputType } from "./input-type";
import { useFormContext } from "react-hook-form";
import { useMergedRef } from "@mantine/hooks";

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
  // const [forceChange, setForceChange] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(ref, inputRef);
  const uuid = useId();

  if (name === undefined) {
    throw new Error("name is required");
  }

  const date = methods.watch(name);

  const triggerChange = () => {
    const hidden_input = document?.querySelector(
      `#${uuid.replaceAll(":", "_")}hidden_input`,
    );
    console.log(hidden_input);
    hidden_input?.dispatchEvent(
      new Event("change", { bubbles: true, cancelable: false }),
    );
  };

  // useLayoutEffect(() => {
  //   triggerChange();
  //   console.log("change", forceChange);
  // }, [forceChange]);

  return (
    <div className="flex w-full grow flex-col">
      <div ref={portalRef} />

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
          <div>
            <input
              type="hidden"
              id={`${uuid.replaceAll(":", "_")}hidden_input`}
              name={name}
              ref={mergedRef}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
            />
            <Button
              onClick={() => {
                methods.setValue(name, "2001-01-01");
                // setForceChange((v) => v + 1);

                triggerChange();
              }}
            >
              test
            </Button>
            <Calendar
              mode="single"
              selected={new Date(date)}
              onSelect={(date) => {
                methods.setValue(name, date?.toISOString());
                // setForceChange((v) => v + 1);
                setTimeout(triggerChange, 1000);
              }}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

FormDate.displayName = "FormDate";

export default FormDate;
