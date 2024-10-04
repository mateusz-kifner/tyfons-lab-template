import type { LiveFormContextType, Key } from "@acme/form/live-form";
import type { ReactNode } from "react";

// export type Key = string | number;

// export interface LiveFormContextType<TData extends Record<Key, any>> {
//   data: TData;
//   onSubmit?: (key: Key, value: TData[Key]) => void;
//   disabled?: boolean;
// }

export interface LiveFormInputType<
  T,
  TData extends Record<Key, T> = Record<Key, T>,
> extends Partial<LiveFormContextType<TData>> {
  label?: string;
  value?: T;
  required?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  keyName?: string | number;
}
