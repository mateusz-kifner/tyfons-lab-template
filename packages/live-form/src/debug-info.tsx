import { forwardRef, type InputHTMLAttributes } from "react";
import type { LiveFormField } from "./input-type";
import { cn } from "@acme/ui";
import { useLiveFormContext } from "./form";
import { useForceUpdate, useLocalStorage } from "@mantine/hooks";

interface FormDebugInfoProps extends LiveFormField<string> {}

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
  } = useLiveFormContext(props);

  const [debug] = useLocalStorage({ key: "debug", defaultValue: "false" });
  if (debug !== "true") return null;
  return (
    <div className={cn("flex flex-shrink flex-nowrap items-center", className)}>
      {!!leftSection && leftSection}
      <span className="pr-2 text-yellow-800 dark:text-yellow-400">{label}</span>
      {value}
      {!!rightSection && rightSection}
    </div>
  );
};

export default FormDebugInfo;
