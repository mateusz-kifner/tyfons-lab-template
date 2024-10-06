import { forwardRef, type InputHTMLAttributes } from "react";
import type { FormInputType } from "./input-type";
import { cn } from "@acme/ui";

interface FormDebugInfoProps
  extends FormInputType,
    InputHTMLAttributes<HTMLInputElement> {}

const FormDebugInfo = forwardRef<HTMLInputElement, FormDebugInfoProps>(
  (props, ref) => {
    const {
      label,
      disabled,
      required,
      maxLength,
      className,
      leftSection,
      rightSection,
      ...moreProps
    } = props;

    if (typeof window === "undefined") return null;

    if (localStorage.getItem("debug") !== "true") return null;

    return (
      <div
        className={cn("flex flex-shrink flex-nowrap items-center", className)}
      >
        <span className="pr-2 text-yellow-800 dark:text-yellow-400">
          {label}
        </span>
        <input
          ref={ref}
          className="min-w-0 flex-shrink bg-transparent"
          disabled
          size={1}
          {...moreProps}
        />
      </div>
    );
  },
);

FormDebugInfo.displayName = "FormDebugInfo";

export default FormDebugInfo;
