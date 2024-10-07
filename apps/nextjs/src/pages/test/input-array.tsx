import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { useId } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { IconTrash, IconPlus, IconTrashX } from "@tabler/icons-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@acme/ui/context-menu";
import { cn } from "@acme/ui";
import { useForceUpdate } from "@mantine/hooks";

interface InputArrayProps {
  name: string;
  form: UseFormReturn;
  showPlus?: boolean;
  showDelete?: boolean;
}

function InputArray(props: InputArrayProps) {
  const { name, form, showPlus = true, showDelete = false } = props;
  const uuid = useId();
  const forceUpdate = useForceUpdate();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name, // unique name for your Field Array
    },
  );

  return (
    <div className="flex flex-col gap-2">
      {fields?.map((_: unknown, index: number) => {
        return (
          <div key={`${uuid}-${index}`} className="flex gap-2">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <Input {...form.register(`${name}[${index}]`)} />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => remove(index)}
                  className={cn(
                    "w-full justify-start bg-red-900 text-destructive-foreground hover:bg-red-900/80",
                  )}
                >
                  <IconTrashX /> Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {showDelete && (
              <Button onClick={() => remove(index)}>
                <IconTrash />
              </Button>
            )}
          </div>
        );
      })}
      {showPlus ? (
        <Button onClick={() => append("")}>
          <IconPlus />
        </Button>
      ) : (
        <div>test</div>
      )}
    </div>
  );
}

export default InputArray;
