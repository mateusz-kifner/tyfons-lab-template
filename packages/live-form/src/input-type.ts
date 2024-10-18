import type { LiveFormContextType, Key } from "./form";
import type { ReactNode } from "react";

// export type Key = string | number;

export interface LiveFormField<T, TData extends Record<Key, T> = Record<Key, T>>
  extends Partial<Omit<LiveFormContextType<TData>, "onSubmit" | "onChange">> {
  label?: string;
  value?: T;
  onChange?: (value: T) => void;
  required?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  name?: string | number;
}
