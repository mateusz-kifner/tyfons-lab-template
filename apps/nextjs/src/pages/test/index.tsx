import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";

import {
  useForm,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { z } from "zod";

import { Input } from "@acme/ui/input";
import { toast } from "sonner";
import { useEffect, useId, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { Button } from "@acme/ui/button";
import LiveFormShortText from "@acme/form/short-text";

const FormSchema = z.object({
  username: z.string().optional(),
  arr: z.array(z.string()).optional().nullable(),
});

function TestPage() {
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
          <LiveFormShortText {...form.register("username")} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default TestPage;
