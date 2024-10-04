import type { LiveFormContextType, Key } from "@acme/live-form/live-form";
import type { ReactNode } from "react";

// export type Key = string | number;

// export interface LiveFormContextType<TData extends Record<Key, any>> {
//   data: TData;
//   onSubmit?: (key: Key, value: TData[Key]) => void;
//   disabled?: boolean;
// }

interface LiveFormInputType<T, TData extends Record<Key, T> = Record<Key, T>>
  extends Partial<LiveFormContextType<TData>> {
  label?: string;
  value?: T;
  required?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  keyName?: string | number;
}

export default LiveFormInputType;
