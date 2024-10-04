import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
} from "react";
import { useLiveFormContextWithoutOverride } from "./live-form";
import { Label } from "@acme/ui/label";
import type LiveFormInput from "./input-type";
import { Button } from "@acme/ui/button";
import { IconPlus, IconTrashX } from "@tabler/icons-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@acme/ui/context-menu";
import useTranslation from "@/hooks/useTranslation";
import { useListState } from "@mantine/hooks";
import { Card, CardContent } from "@acme/ui/card";

interface LiveFormArrayProps<T> extends LiveFormInput<T[]> {
  children:
    | ReactElement
    | ((
        key: string,
        overrideProps: {
          data?: Record<string, any>;
          onSubmit?: (key: string | number, value: T) => void;
          keyName: string | number;
        },
      ) => ReactNode);
}

function LiveFormArrayWrapper(props: { label?: string; children: ReactNode }) {
  return (
    <div className="flex-grow">
      <Label label={props.label} />

      <div className="flex min-h-[2.75rem] flex-col gap-2">
        <Card className="flex flex-col gap-2 p-2">{props.children}</Card>
      </div>
    </div>
  );
}

function LiveFormArray<T = any>(props: LiveFormArrayProps<T>) {
  const { children, keyName, label, disabled } = props;
  const context = useLiveFormContextWithoutOverride();

  const t = useTranslation();
  if (keyName === undefined || typeof keyName === "number")
    throw new Error("keyName not defined");
  const uuid = useId();
  const data = props?.data?.[keyName] ?? context.data?.[keyName] ?? [];
  const superOnSubmit = props.onSubmit ?? context.onSubmit;
  const [values, handlers] = useListState<T | undefined>(data);
  const [update, setUpdate] = useState(false);

  const onSubmit = (key: string | number, value?: T) => {
    if (typeof key === "string")
      throw new Error("LiveFormArray received string key");
    handlers.setItem(key, value);
    setUpdate(true);
  };

  const onDelete = (key: number) => {
    handlers.remove(key);
    setUpdate(true);
  };

  const onAddOne = () => {
    handlers.append(undefined);
  };
  const val = values.filter((val): val is T =>
    typeof val === "number" ? val !== undefined : !!val,
  );

  // Forward update

  useEffect(() => {
    if (update) {
      superOnSubmit?.(keyName, val);
      setUpdate(false);
    }
  }, [update]);

  if (typeof children === "function" && !isValidElement(children))
    return (
      <LiveFormArrayWrapper label={label}>
        {values.map((_: any, index: number) => (
          <ContextMenu key={`${uuid}${index}:wrapper:`}>
            <ContextMenuTrigger>
              {children(`${uuid}${index}:`, {
                data: values,
                onSubmit,
                keyName: index,
              })}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                className="flex items-center gap-2 focus:bg-destructive focus:text-destructive-foreground"
                onClick={() => onDelete(index)}
              >
                <IconTrashX /> {t.delete}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
        {!disabled && (
          <Button variant="ghost" onClick={() => onAddOne()}>
            <IconPlus />
          </Button>
        )}
      </LiveFormArrayWrapper>
    );
  return (
    <LiveFormArrayWrapper label={label}>
      {/* {values.length == 0 && <div className="h-12 rounded  p-2">⸺</div>} */}
      {values.map((_: any, index: number) => (
        <ContextMenu key={`${uuid}${index}:wrapper:`}>
          <ContextMenuTrigger>
            {cloneElement(children, {
              keyName: index,
              data: values,
              onSubmit,
              key: `${uuid}${index}:`,
            })}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="flex items-center gap-2 focus:bg-destructive focus:text-destructive-foreground"
              onClick={() => onDelete(index)}
            >
              <IconTrashX /> {t.delete}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      {!disabled && (
        <Button variant="ghost" onClick={() => onAddOne()}>
          <IconPlus />
        </Button>
      )}
    </LiveFormArrayWrapper>
  );
}

export default LiveFormArray;
