import { forwardRef, type CSSProperties, type ReactNode } from "react";
import type { FormInputType } from "./input-type";
import { Label } from "@acme/ui/label";
import type { UseFormRegister } from "react-hook-form";
import { cn } from "@acme/ui";

interface FormShortTextProps
  extends FormInputType<string>,
    UseFormRegister<any> {
  style?: CSSProperties;
}
const LiveFormShortText = forwardRef<HTMLInputElement, FormShortTextProps>(
  (props, ref) => {
    const {
      label,
      disabled,
      required,
      style,
      className,
      leftSection,
      rightSection,
      ...moreProps
    } = props;

    return (
      <div style={style} className={cn("", className)}>
        <Label
          label={label}
          // copyValue={value}
          // required={required}
        />
        <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {!!leftSection && leftSection}
          <input
            type="text"
            disabled={disabled}
            required={required}
            className="flex w-full  bg-transparent text-sm outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none"
            ref={ref}
            {...moreProps}
          />
          {!!rightSection && rightSection}
        </div>
      </div>
    );
  },
);

// import {
//   useEffect,
//   useId,
//   useRef,
//   useState,
//   type CSSProperties,
//   useLayoutEffect,
// } from "react";

// import preventLeave from "@/utils/preventLeave";

// import DisplayCell from "@acme/ui/DisplayCell";
// import { Label } from "@acme/ui/label";
// import type LiveFormInput from "./live-form";
// import inputFocusAtEndOfLine from "@/utils/inputFocusAtEndOfLine";
// import { useClickOutside } from "@mantine/hooks";
// import { useLiveFormContext } from "./LiveForm";
// import { cn } from "@acme/ui";

// interface LiveFormShortTextProps extends LiveFormInput<string> {
//   maxLength?: number;
//   style?: CSSProperties;
// }

// const LiveFormShortText = (props: LiveFormShortTextProps) => {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     maxLength,
//     style,
//     className,
//     leftSection,
//     rightSection,

//     keyName,
//     ...moreProps
//   } = useLiveFormContext(props);
//   const uuid = useId();
//   const [text, setText] = useState<string>(value ?? "");
//   const [focus, setFocus] = useState<boolean>(false);
//   const InputRef = useRef<HTMLInputElement>(null);
//   const outerRef = useClickOutside(() => setFocus(false));
//   const onFocus = () => !disabled && setFocus(true);

//   useEffect(() => {
//     if (focus) {
//       inputFocusAtEndOfLine(InputRef);
//       window.addEventListener("beforeunload", preventLeave);
//     } else {
//       if (text !== (value ?? "")) {
//         onSubmit?.(text);
//       }
//       window.removeEventListener("beforeunload", preventLeave);
//     }
//   }, [focus]);

//   useLayoutEffect(() => {
//     return () => {
//       if (text !== (value ?? "")) {
//         onSubmit?.(text);
//       }
//       window.removeEventListener("beforeunload", preventLeave);
//     };
//   }, []);

//   useEffect(() => {
//     const new_value = value ?? "";
//     setText(new_value);
//   }, [value]);

//   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!(maxLength && e.target.value.length > maxLength)) {
//       setText(e.target.value);
//     }
//   };

//   const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (focus) {
//       if (e.code === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         (e.target as HTMLInputElement).blur();
//         setFocus(false);
//       }
//     }
//   };

//   return (
//     // biome-ignore lint/a11y/useKeyWithClickEvents: This is intended to be focused with keyboard or mouse, no onPress needed
//     <div
//       className="flex-grow"
//       onClick={onFocus}
//       onFocus={onFocus}
//       ref={outerRef}
//     >
//       <Label label={label} copyValue={text} htmlFor={`short_text_${uuid}`} />
//       <DisplayCell
//         leftSection={leftSection}
//         rightSection={rightSection}
//         focus={focus}
//         disabled={disabled}
//         className={className}
//       >
//         <input
//           id={`short_text_${uuid}`}
//           name={`short_text_${uuid}`}
//           required={required}
//           readOnly={disabled}
//           ref={InputRef}
//           className={cn(
//             "w-full resize-none overflow-hidden whitespace-pre-line break-words bg-transparent py-3 text-sm outline-none focus-visible:border-transparent focus-visible:outline-none data-disabled:text-gray-500 dark:data-disabled:text-gray-500",
//             className,
//           )}
//           style={style}
//           value={text}
//           onFocus={onFocus}
//           onClick={onFocus}
//           onChange={onChangeInput}
//           onKeyDown={onKeyDownInput}
//           maxLength={maxLength}
//           {...moreProps}
//         />
//       </DisplayCell>
//     </div>
//   );
// };

// export default LiveFormShortText;

export default LiveFormShortText;
