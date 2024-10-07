import { createContext, useContext, type ReactNode } from "react";

export type Key = string | number;

export interface FormContextType<TData extends Record<Key, any>> {
  data: TData;
  onSubmit?: (key: Key, value: TData[Key]) => void;
  disabled?: boolean;
}

export const FormContext = createContext<FormContextType<any>>({
  data: {},
  onSubmit: () => console.log("Not ready yet"),
  disabled: false,
});

export interface FormProps<TData> {
  children: ReactNode;
  data: TData;
  onSubmit?: (key: Key, value: any) => void;
  disabled?: boolean;
}

export function Form<T extends Record<string, any>>(props: FormProps<T>) {
  const { children, disabled = false, ...moreProps } = props;

  return (
    <FormContext.Provider value={{ ...moreProps, disabled }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContextWithoutOverride<
  T extends Record<string, any>,
>(): FormContextType<T> {
  const state = useContext(FormContext);

  return state;
}

export function useFormContext<
  T extends Record<Key, any> & {
    data?: Record<Key, any>;
    onSubmit?: (key: Key, value: TValue) => void; // initial onSubmit
    keyName?: Key;
    value?: TValue;
  },
  TValue = any, // Need this to coerce onSubmit to have proper value
>(props: T) {
  const {
    data: data_props,
    onSubmit: onSubmit_props,
    keyName,
    ...moreProps
  } = props;
  if (keyName === undefined) throw new Error("keyName not defined");
  const state = useContext(FormContext);
  const data = data_props ?? state.data;
  const onSubmit = onSubmit_props ?? state.onSubmit;
  const value: TValue = data[keyName];
  return {
    data,
    onSubmit: (value) => onSubmit?.(keyName, value as TValue),
    keyName,
    value,
    ...moreProps,
  } as Omit<T, "onSubmit"> & { onSubmit: (value: T["value"]) => void }; // Simple onSubmit with proper types
}

export { Form as default };
