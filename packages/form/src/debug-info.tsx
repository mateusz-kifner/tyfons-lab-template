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
    // const { debug } = useUserContext();
    const debug = true;
    return debug ? (
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
    ) : null;
  },
);

export default FormDebugInfo;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { CSSProperties } from "react";

// import { useUserContext } from "@/context/userContext";
// import type LiveFormInput from "./live-form";
// import { useLiveFormContext } from "./LiveForm";

// interface LiveFormDebugInfoProps extends LiveFormInput<string> {
//   maxLength?: number;
//   style?: CSSProperties;
// }

// const LiveFormDebugInfo = (props: LiveFormDebugInfoProps) => {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     maxLength,
//     className,
//     leftSection,
//     rightSection,
//     keyName,
//     ...moreProps
//   } = useLiveFormContext(props);
//   const { debug } = useUserContext();

//   return debug ? (
//     <div {...moreProps}>
//       <span className="pr-2 text-yellow-800 dark:text-yellow-400">{label}</span>
//       {value}
//     </div>
//   ) : null;
// };

// export default LiveFormDebugInfo;
