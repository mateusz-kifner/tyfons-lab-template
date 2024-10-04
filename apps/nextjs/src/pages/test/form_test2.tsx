"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "sonner";
import { useEffect, useId, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import InputArray from "./input-array";

export interface InputProps extends UseControllerProps<any, any> {}

const InputArray2 = (props: InputProps) => {
  const { name, control, defaultValue } = props;
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue,
  });
  const uuid = useId();
  return (
    <div>
      {field.value
        ? field.value.map((val: string, index: number) => (
            <div key={`${uuid}-${index}`} className="flex gap-2">
              <Input
                onChange={(e) => {
                  const new_arr = [...field.value];
                  new_arr[index] = e.target.value;
                  field.onChange(new_arr);
                }}
                value={val}
              />
              <Button
                onClick={() =>
                  field.onChange([
                    ...field.value.slice(0, index),
                    ...field.value.slice(index + 1),
                  ])
                }
              >
                -
              </Button>
            </div>
          ))
        : null}
      <Button
        onClick={() =>
          field.value
            ? field.onChange([...field.value, ""])
            : field.onChange([""])
        }
      >
        +
      </Button>
    </div>
  );
};

const InputSelect = (props: InputProps) => {
  const { name, control, defaultValue } = props;
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue,
  });
  return (
    <Select
      onValueChange={(value) => {
        field.onChange(value);
      }} // send value to hook form
      onOpenChange={
        (open) => {
          if (open === false) {
            field.onBlur();
          }
        } // notify when input is touched/blur
      }
      value={field.value} // input value
      name={field.name} // send down the input name
      // inputRef={field.ref} // send input ref, so we can focus on input when error appear
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const FormSchema = z.object({
  username: z.string().optional(),
  arr: z.array(z.string()).optional().nullable(),
});

export function InputForm({
  initialData,
}: { initialData?: { username: string } }) {
  const [data, setData] = useState<z.infer<typeof FormSchema>>({
    arr: ["1", "2", "3"],
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    // resolver: zodResolver(FormSchema),
    values: data,
    mode: "all",
    reValidateMode: "onChange",
  });
  const [dataDebounced] = useDebouncedValue(data, 500);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setData(data);
  }

  useEffect(() => {
    toast("Submitted:", {
      description: (
        <pre className="mt-2 w-[332px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(dataDebounced, null, 2)}
          </code>
        </pre>
      ),
    });
  }, [dataDebounced]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
          onChange={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <Input {...form.register("username")} />
          <InputArray
            name="arr"
            form={form}
            // defaultValue={["", ""]}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button
        onClick={() => {
          setData({
            arr: ["", ""],
          });
        }}
      >
        change
      </Button>
    </div>
  );
}

function TestPage() {
  return (
    <div>
      <InputForm initialData={{ username: "shadcn" }} />
    </div>
  );
}

export default TestPage;
