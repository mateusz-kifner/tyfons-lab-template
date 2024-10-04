"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function InputForm({
  initialData,
}: { initialData?: { username: string } }) {
  const [data, setData] = useState({ username: "shadcn" });
  const [count, setCount] = useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button
        onClick={() => {
          setData({ username: `tyfon${count}` });
          setCount((v) => v + 1);
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
