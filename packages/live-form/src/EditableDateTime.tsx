import {
  useEffect,
  //useRef,
  useState,
} from "react";

// import { useClickOutside, useClipboard, useId } from "@mantine/hooks";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";

import DisplayCell from "@shirterp/ui-web/DisplayCell";
import preventLeave from "@/utils/preventLeave";

import { Label } from "@shirterp/ui-web/Label";
import type EditableInput from "@/types/EditableInput";
import { useEditableContext } from "./Editable";

// TODO: make it editable
// BUG: clicking on label causes copy onClick to occur.

interface EditableDateTimeProps extends EditableInput<string> {
  collapse?: boolean;
}

const EditableDateTime = (props: EditableDateTimeProps) => {
  const {
    label,
    value,
    onSubmit,
    // disabled,
    // required,
    collapse = false,
    // keyName,
  } = useEditableContext(props);

  // let new_props = { ...props }
  // delete new_label
  // delete new_value
  // const uuid = useId();
  const [date, setDate] = useState<Date | null>(value ? new Date(value) : null);
  const [prevDate, setPrevDate] = useState<Date | null>(date);
  // const [lock, setLock] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  // const clipboard = useClipboard();
  // const dateRef = useRef<HTMLButtonElement>(null);
  // const activate = () => {
  //   setActive(true);
  // };
  // const deactivate = () => {
  //   !lock && setActive(false);
  // };

  // const ref = useClickOutside(deactivate);

  useEffect(() => {
    if (active) {
      window.addEventListener("beforeunload", preventLeave);
      // dateRef.current &&(dateRef.current.selectionStart = dateRef.current.value.length)
      // dateRef.current && dateRef.current.focus()
    } else {
      if (date !== prevDate) {
        onSubmit?.(date?.toISOString() ?? undefined);
        setPrevDate(date);
      }
      window.removeEventListener("beforeunload", preventLeave);
    }
  }, [active]);

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", preventLeave);
    };
  }, []);

  useEffect(() => {
    const new_value = value ? new Date(value) : new Date();
    setDate(new_value);
    setPrevDate(new_value);
  }, [value]);

  // const onKeyDownDate = (e: React.KeyboardEvent<any>) => {
  //   if (active) {
  //     if (e.code == "Enter") {
  //       deactivate();
  //       e.preventDefault();
  //     }
  //     if (e.code == "Escape") {
  //       setDate(prevDate);
  //       deactivate();
  //       e.preventDefault();
  //     }
  //   }
  // };

  return (
    <div
      className={`flex-grow${collapse ? "flex items-center" : ""}`}
      // onClick={() => !disabled && setFocus(true)}
      // onFocus={() => !disabled && setFocus(true)}
      // onBlur={handleBlurForInnerElements(() => setFocus(false))}
    >
      <Label label={label} copyValue={dayjs(date).format("L LT").toString()} />
      <DisplayCell
        leftSection={<IconCalendar size={18} />}
        className="border-none bg-transparent text-gray-400 dark:text-stone-600"
        disabled
      >
        {active ? (
          <div className="flex flex-grow gap-2">{/* TODO */}</div>
        ) : (
          <div className="flex gap-2">
            {date ? dayjs(date).format("L").toString() : "⸺"}
            <IconClock
              className="text-gray-400 dark:text-stone-600"
              size={18}
            />
            {date ? dayjs(date).format("LT").toString() : "⸺"}
          </div>
        )}
      </DisplayCell>
    </div>
  );
};

export default EditableDateTime;
