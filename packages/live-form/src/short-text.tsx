import { forwardRef, type CSSProperties } from "react";
import type { LiveFormField } from "./input-type";
import { Label } from "@acme/ui/label";
import { useLiveFormContext } from "./form";
import { cn } from "@acme/ui";

interface LiveFormShortTextProps extends LiveFormField<string> {
  style?: CSSProperties;
}
const LiveFormShortText = forwardRef<HTMLInputElement, LiveFormShortTextProps>(
  (props, ref) => {
    const {
      label,
      value,
      onChange,
      disabled,
      required,
      style,
      className,
      leftSection,
      rightSection,
      name,
      ...moreProps
    } = useLiveFormContext(props);

    return (
      <div style={style} className={cn("grow", className)}>
        <Label label={label} copyValue={value} required={required} />
        <div className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-2 text-gray-300 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:text-stone-400 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring dark:text-stone-600 dark:has-[:focus-visible]:text-stone-500">
          {!!leftSection && leftSection}
          <input
            type="text"
            disabled={disabled}
            // required={required}
            value={value}
            className="flex h-10 w-full bg-transparent text-sm text-stone-800 outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none dark:text-stone-200"
            ref={ref}
            onChange={(e) => onChange?.(e.target.value)}
            {...moreProps}
          />
          {!!rightSection && rightSection}
        </div>
      </div>
    );
  },
);

LiveFormShortText.displayName = "LiveFormShortText";

export default LiveFormShortText;
