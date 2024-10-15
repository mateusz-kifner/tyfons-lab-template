import { forwardRef, type CSSProperties } from "react";
import { Label } from "@acme/ui/label";
import { Switch } from "@acme/ui/switch";
import { cva, type VariantProps } from "class-variance-authority";
import { useHover } from "@mantine/hooks";
import type { VirtualFormField } from "./input-type";
import { useVirtualFormContext } from "./form";

const editableSwitchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        color:
          "data-[state=checked]:border-green-800 data-[state=unchecked]:border-red-800 data-[state=checked]:dark:border-green-500 data-[state=unchecked]:dark:border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface VirtualFormSwitchProps
  extends VirtualFormField<boolean | null>,
    VariantProps<typeof editableSwitchVariants> {
  style?: CSSProperties;
  stateLabels?: { checked: string; unchecked: string };
  // stateColors?: { checked: string; unchecked: string };
}
const VirtualFormSwitch = (props: VirtualFormSwitchProps) => {
  const {
    label,
    value,
    onChange,
    disabled,
    required,
    style,
    stateLabels = { checked: "Tak", unchecked: "Nie" },
    className,
    leftSection,
    rightSection,
    variant,
    name,
    ...moreProps
  } = useVirtualFormContext(props);
  const { hovered, ref: hoverRef } = useHover();

  const active = hovered && !disabled;

  return (
    <div className="mb-1 flex min-h-[2rem] items-center gap-2" ref={hoverRef}>
      {!!leftSection && leftSection}
      <div>{label}</div>
      {active ? (
        <Switch onCheckedChange={onChange} checked={value} variant={variant} />
      ) : (
        <div
          className={editableSwitchVariants({
            variant,
          })}
          data-state={(value ?? false) ? "checked" : "unchecked"}
        >
          {value ? stateLabels.checked : stateLabels.unchecked}
        </div>
      )}
      {!!rightSection && rightSection}
    </div>
  );
};

export default VirtualFormSwitch;
