import {
  forwardRef,
  type InputHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { FormInputType } from "./input-type";
import { Label } from "@acme/ui/label";
import { useFormContext } from "react-hook-form";

interface FormShortTextProps
  extends FormInputType,
    InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
}
const FormShortText = forwardRef<HTMLInputElement, FormShortTextProps>(
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
    const methods = useFormContext();

    return (
      <div style={style} className={className}>
        <Label
          label={label}
          copyValue={props.name ? methods.getValues(props.name) : undefined}
          required={required}
        />
        <div className="flex h-10 w-full items-center gap-2 rounded-md border border-input px-2 text-gray-300 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:text-stone-400 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring dark:text-stone-600 dark:has-[:focus-visible]:text-stone-500">
          {!!leftSection && leftSection}
          <input
            type="text"
            disabled={disabled}
            // required={required}
            className="flex h-10 w-full bg-transparent text-sm text-stone-800 outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none dark:text-stone-200"
            ref={ref}
            {...moreProps}
          />
          {!!rightSection && rightSection}
        </div>
      </div>
    );
  },
);

export default FormShortText;
