import {
  forwardRef,
  type InputHTMLAttributes,
  type CSSProperties,
} from "react";
import type { FormInputType } from "./input-type";
import { Label } from "@acme/ui/label";
import { Controller, useFormContext } from "react-hook-form";
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
    const methods = useFormContext();
    const { control } = methods;
    const { hovered, ref: hoverRef } = useHover();

    const active = hovered && !disabled;

    if (props.name === undefined) {
      throw new Error("name must be defined");
    }
    const val = methods.getValues(props.name);

    return (
      <div className="mb-1 flex min-h-[2rem] items-center gap-2" ref={hoverRef}>
        {!!leftSection && leftSection}
        <div>{label}</div>
        {active ? (
          <Controller
            control={control}
            name={props.name}
            render={({ field }) => (
              <Switch
                onCheckedChange={field.onChange}
                name={field.name}
                checked={field.value}
                ref={ref}
                variant={variant}
              />
            )}
          />
        ) : (
          <div
            className={editableSwitchVariants({
              variant,
            })}
            data-state={(val ?? false) ? "checked" : "unchecked"}
          >
            {val ? stateLabels.checked : stateLabels.unchecked}
          </div>
        )}
        {!!rightSection && rightSection}
      </div>
    );
  },
);

export default FormSwitch;

// import { useEffect, useState } from "react";

// import { Switch } from "@acme/ui/switch";
// import { useHover } from "@mantine/hooks";

// import type LiveFormInput from "./live-form";
// import { useLiveFormContext } from "./LiveForm";
// import { type VariantProps, cva } from "class-variance-authority";

// // FIXME: respect disabled state
// // TODO: center text on button and add color variant

// // LiveFormInput<T> {
// //   label?: string;
// //   value?: T;
// //   onSubmit?: (value: T | null) => void | boolean;
// //   disabled?: boolean;
// //   required?: boolean;
// //   leftSection?: ReactNode;
// //   rightSection?: ReactNode;
// //   className?: string;
// // }

// interface LiveFormSwitchProps
//   extends LiveFormInput<boolean>,
//     VariantProps<typeof LiveFormSwitchVariants> {
//   stateLabels?: { checked: string; unchecked: string };
//   stateColors?: { checked: string; unchecked: string };
// }

// const LiveFormSwitchVariants = cva(
//   "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "",
//         color:
//           "data-[state=checked]:border-green-800 data-[state=unchecked]:border-red-800 data-[state=checked]:dark:border-green-500 data-[state=unchecked]:dark:border-red-500",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

// const LiveFormSwitch = (props: LiveFormSwitchProps) => {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     // required,
//     stateLabels = { checked: "Tak", unchecked: "Nie" },
//     // stateColors = { checked: "#2f9e44", unchecked: "#e03131" },
//     rightSection,
//     leftSection,
//     variant,
//     // keyName,
//   } = useLiveFormContext(props);

//   // const switchRef = useRef(null);
//   const [bool, setBool] = useState<boolean>(value ?? false);
//   const [dirty, setDirty] = useState<boolean>(false);
//   const { hovered, ref } = useHover();

//   const active = hovered && !disabled;

//   useEffect(() => {
//     value !== undefined && setBool(value);
//   }, [value]);

//   useEffect(() => {
//     if (dirty) {
//       onSubmit?.(bool);
//     }
//   }, [bool]);

//   const handleChange = (checked: boolean) => {
//     setDirty(true);
//     onSubmit?.(checked);
//   };

//   return (
//     <div className="mb-1 flex min-h-[2rem] items-center gap-2" ref={ref}>
//       {!!leftSection && leftSection}
//       <div>{label}</div>
//       {active ? (
//         <Switch
//           checked={value}
//           onCheckedChange={handleChange}
//           variant={variant}
//         />
//       ) : (
//         <div
//           className={LiveFormSwitchVariants({
//             variant,
//           })}
//           data-state={(value ?? false) ? "checked" : "unchecked"}
//         >
//           {bool ? stateLabels.checked : stateLabels.unchecked}
//         </div>
//         //   <div
//         //   className={`px relative rounded-md font-bold after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:shadow ${
//         //     bool ? "after:shadow-green-700" : "after:shadow-red-700"
//         //   }`}
//         // >
//         //   {bool ? stateLabels.checked : stateLabels.unchecked}
//         // </div>
//       )}
//       {!!rightSection && rightSection}
//     </div>
//   );
// };

// export default LiveFormSwitch;
