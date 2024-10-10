import { forwardRef, type InputHTMLAttributes } from "react";
import type { VirtualFormField } from "./input-type";
import { cn } from "@acme/ui";
import { useVirtualFormContext } from "./form";

interface FormDebugInfoProps extends VirtualFormField<string> {}

const FormDebugInfo = (props: FormDebugInfoProps) => {
  const {
    label,
    value,
    onChange,
    disabled,
    required,
    className,
    leftSection,
    rightSection,
    ...moreProps
  } = useVirtualFormContext(props);

  if (typeof window === "undefined") return null;

  if (localStorage.getItem("debug") !== "true") return null;

  return (
    <div className={cn("flex flex-shrink flex-nowrap items-center", className)}>
      <span className="pr-2 text-yellow-800 dark:text-yellow-400">{label}</span>
      {value}
    </div>
  );
};

export default FormDebugInfo;
