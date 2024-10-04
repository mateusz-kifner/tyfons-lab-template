import { useEffect, useId, useRef, useState } from "react";

import { useClickOutside, useDebouncedValue } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import DisplayCell from "@acme/ui/DisplayCell";

import { Button } from "@acme/ui/button";
import { Label } from "@acme/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import type LiveFormInput from "./input-type";
import inputFocusAtEndOfLine from "@/utils/inputFocusAtEndOfLine";
import { IconCalendar } from "@tabler/icons-react";
import Calendar from "react-calendar";
import { useLiveFormContext } from "./LiveForm";

type InputDateProps = LiveFormInput<Date>;

// TODO : refactor dates to use string date
// TODO : fix date value
// FIXME: reduce excessive updates

const LiveFormDate = (props: InputDateProps) => {
  const {
    label,
    value,
    onSubmit,
    disabled,
    required,
    leftSection,
    rightSection,
    // keyName,
  } = useLiveFormContext(props);
  const uuid = useId();
  const router = useRouter();
  const [focus, setFocus] = useState<boolean>(false);
  const dateFormat = router.locale === "pl" ? "DD.MM.YYYY" : "YYYY-MM-DD";
  const dateFromValue = dayjs(value ?? null).utcOffset(0);
  const [text, setText] = useState(
    dateFromValue.isValid() ? dateFromValue.format("L").toString() : "",
  );

  const [debouncedText] = useDebouncedValue(text, 300);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [calendarOpened, setCalendarOpened] = useState<boolean>(false);
  const outerRef = useClickOutside(() => setFocus(false));
  const onFocus = () => !disabled && setFocus(true);

  useEffect(() => {
    if (focus && !calendarOpened) {
      inputFocusAtEndOfLine(inputDateRef);
    }
  }, [focus]);

  useEffect(() => {
    if (debouncedText.length === 0) {
      setError(false);
      if (value !== null) {
        onSubmit?.(undefined);
      }
      return;
    }

    const newDate = dayjs(debouncedText, dateFormat, router.locale);
    if (!newDate.isValid()) {
      setError(true);
      return;
    }

    if (
      newDate.format("YYYY-MM-DD").toString() !==
      dayjs(value).format("YYYY-MM-DD").toString()
    ) {
      setError(false);
      onSubmit?.(
        //@ts-ignore
        newDate
          .format("YYYY-MM-DD")
          .toString(), /// HACK FIXME: this should work with strings
      );
    }
  }, [debouncedText]);

  return (
    <div className="relative flex-grow" ref={outerRef}>
      <Label label={label} copyValue={text} htmlFor={`inputDate_${uuid}`} />
      <DisplayCell
        onFocus={onFocus}
        onClick={onFocus}
        className={"px-2"}
        error={error}
        disabled={disabled}
        leftSection={leftSection}
        rightSection={
          !disabled && (
            <Popover
              onOpenChange={setCalendarOpened}
              // contentProps={{ align: "end", sideOffset: 13 }}
            >
              <PopoverTrigger asChild>
                {rightSection ? (
                  rightSection
                ) : (
                  <div className="flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-stone-800 dark:text-stone-200"
                    >
                      <IconCalendar size={18} />
                    </Button>
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="flex w-96 justify-center rounded border-gray-400 bg-white p-2 dark:border-stone-600 dark:bg-stone-900"
              >
                <Calendar
                  onChange={(date) => {
                    setText(
                      dayjs(date as Date)
                        .format("L")
                        .toString(),
                    );
                  }}
                  value={
                    dayjs(text).isValid() ? dayjs(text).toDate() : undefined
                  }
                />
              </PopoverContent>
            </Popover>
          )
        }
        focus={focus || calendarOpened}
      >
        <input
          id={`inputDate_${uuid}`}
          name={`inputDate_${uuid}`}
          ref={inputDateRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onClick={onFocus}
          onFocus={onFocus}
          className="w-full resize-none overflow-hidden whitespace-pre-line break-words bg-transparent py-1 text-sm outline-none placeholder:text-gray-400 focus-visible:border-transparent focus-visible:outline-none data-disabled:text-gray-500 dark:data-disabled:text-gray-500 dark:placeholder:text-stone-600"
          readOnly={disabled}
          required={required}
          autoComplete="off"
        />
      </DisplayCell>
    </div>
  );
};

export default LiveFormDate;
