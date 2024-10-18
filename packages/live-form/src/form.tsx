import { createContext, useContext, type ReactNode } from "react";

export type Key = string | number;

export interface LiveFormContextType<TData extends Record<Key, any>> {
  data: TData;
  onSubmit?: (key: Key, value: TData[Key]) => void;
  onChange?: (key: Key, value: TData[Key]) => void;
  disabled?: boolean;
}

export const LiveFormContext = createContext<LiveFormContextType<any>>({
  data: {},
  onSubmit: () => console.log("Not ready yet"),
  onChange: () => console.log("Not ready yet"),
  disabled: false,
});

export interface LiveFormProps<TData> {
  children: ReactNode;
  data: TData;
  onSubmit?: (key: Key, value: any) => void;
  onChange?: (key: Key, value: any) => void;
  disabled?: boolean;
}

export function LiveForm<T extends Record<string, any>>(
  props: LiveFormProps<T>,
) {
  const {
    children,
    onSubmit,
    onChange,
    disabled = false,
    ...moreProps
  } = props;

  return (
    <LiveFormContext.Provider
      value={{ ...moreProps, onSubmit, onChange, disabled }}
    >
      {children}
    </LiveFormContext.Provider>
  );
}

export function useLiveFormContextWithoutOverride<
  T extends Record<string, any>,
>(): LiveFormContextType<T> {
  const state = useContext(LiveFormContext);

  return state;
}

export function useLiveFormContext<
  T extends Record<Key, any> & { name?: Key },
  TValue = T["name"], // Need this to coerce onSubmit to have proper value
>(props: T) {
  const { name, ...moreProps } = props;
  if (name === undefined) throw new Error("name not defined");
  const { onChange, data } = useContext(LiveFormContext);
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

export { LiveForm as default };
