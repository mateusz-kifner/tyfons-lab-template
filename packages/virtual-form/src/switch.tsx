import {
  forwardRef,
  type InputHTMLAttributes,
  type CSSProperties,
} from "react";
import type { FormInputType } from "./input-type";
import { Label } from "@acme/ui/label";
import { Switch } from "@acme/ui/switch";
import { cva, type VariantProps } from "class-variance-authority";
import { useHover, useMergedRef } from "@mantine/hooks";

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

interface FormSwitchProps
  extends FormInputType,
    InputHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof editableSwitchVariants> {
  style?: CSSProperties;
  stateLabels?: { checked: string; unchecked: string };
  // stateColors?: { checked: string; unchecked: string };
}
const FormSwitch = forwardRef<HTMLButtonElement, FormSwitchProps>(
  (props, ref) => {
    const {
      label,
      disabled,
      required,
      style,
      stateLabels = { checked: "Tak", unchecked: "Nie" },
      className,
      leftSection,
      rightSection,
      variant,
      ...moreProps
    } = props;
    const { hovered, ref: hoverRef } = useHover();

    const active = hovered && !disabled;

    if (props.name === undefined) {
      throw new Error("name must be defined");
    }

    return (
      <Controller
        control={control}
        name={props.name}
        render={({ field }) => (
          <div
            className="mb-1 flex min-h-[2rem] items-center gap-2"
            ref={hoverRef}
          >
            {!!leftSection && leftSection}
            <div>{label}</div>
            {active ? (
              <Switch
                onCheckedChange={field.onChange}
                name={field.name}
                checked={field.value}
                ref={ref}
                variant={variant}
              />
            ) : (
              <div
                className={editableSwitchVariants({
                  variant,
                })}
                data-state={(field.value ?? false) ? "checked" : "unchecked"}
              >
                {field.value ? stateLabels.checked : stateLabels.unchecked}
              </div>
            )}
            {!!rightSection && rightSection}
          </div>
        )}
      />
    );
  },
);

FormSwitch.displayName = "FormSwitch";

export default FormSwitch;
