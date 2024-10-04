/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CSSProperties } from "react";

import { useUserContext } from "@/context/userContext";
import type LiveFormInput from "./live-form";
import { useLiveFormContext } from "./LiveForm";

interface LiveFormDebugInfoProps extends LiveFormInput<string> {
  maxLength?: number;
  style?: CSSProperties;
}

const LiveFormDebugInfo = (props: LiveFormDebugInfoProps) => {
  const {
    label,
    value,
    onSubmit,
    disabled,
    required,
    maxLength,
    className,
    leftSection,
    rightSection,
    keyName,
    ...moreProps
  } = useLiveFormContext(props);
  const { debug } = useUserContext();

  return debug ? (
    <div {...moreProps}>
      <span className="pr-2 text-yellow-800 dark:text-yellow-400">{label}</span>
      {value}
    </div>
  ) : null;
};

export default LiveFormDebugInfo;
