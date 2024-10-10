import { createContext, useContext, type ReactNode } from "react";

export type Key = string | number;

export interface VirtualFormContextType<TData extends Record<Key, any>> {
  data: TData;
  onSubmit?: (key: Key, value: TData[Key]) => void;
  onChange?: (key: Key, value: TData[Key]) => void;
  disabled?: boolean;
}

export const VirtualFormContext = createContext<VirtualFormContextType<any>>({
  data: {},
  onSubmit: () => console.log("Not ready yet"),
  onChange: () => console.log("Not ready yet"),
  disabled: false,
});

export interface VirtualFormProps<TData> {
  children: ReactNode;
  data: TData;
  onSubmit?: (key: Key, value: any) => void;
  onChange?: (key: Key, value: any) => void;
  disabled?: boolean;
}

export function VirtualForm<T extends Record<string, any>>(
  props: VirtualFormProps<T>,
) {
  const {
    children,
    onSubmit,
    onChange,
    disabled = false,
    ...moreProps
  } = props;

  return (
    <VirtualFormContext.Provider
      value={{ ...moreProps, onSubmit, onChange, disabled }}
    >
      {children}
    </VirtualFormContext.Provider>
  );
}

export function useVirtualFormContextWithoutOverride<
  T extends Record<string, any>,
>(): VirtualFormContextType<T> {
  const state = useContext(VirtualFormContext);

  return state;
}

export function useVirtualFormContext<
  T extends Record<Key, any> & { name?: Key },
  TValue = T["name"], // Need this to coerce onSubmit to have proper value
>(props: T) {
  const { name, ...moreProps } = props;
  if (name === undefined) throw new Error("name not defined");
  const { onChange, data } = useContext(VirtualFormContext);
  const value: TValue = data[name];
  return {
    data,
    onChange: (value: TValue) => onChange?.(name, value as TValue),
    name,
    value,
    ...moreProps,
  };
  //  as Omit<T, "onChange"> & { onChange: (value: TValue) => void }; // Simple onSubmit with proper types
}

export { VirtualForm as default };
