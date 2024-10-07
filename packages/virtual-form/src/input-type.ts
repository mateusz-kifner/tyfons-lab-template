import type { FormContextType, Key } from "@acme/virtual-form/live-form";
import type { ReactNode } from "react";

// export type Key = string | number;

// export interface LiveFormContextType<TData extends Record<Key, any>> {
//   data: TData;
//   onSubmit?: (key: Key, value: TData[Key]) => void;
//   disabled?: boolean;
// }

export interface FormInputType {
  // extends Partial<FormContextType<TData>>
  label?: string;
  required?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  // keyName?: string | number;
}
