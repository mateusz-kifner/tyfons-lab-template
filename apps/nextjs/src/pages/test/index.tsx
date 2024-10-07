import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Input } from "@acme/ui/input";
import { toast } from "sonner";
import { useEffect, useId, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { Button } from "@acme/ui/button";
import FormShortText from "@acme/virtual-form/short-text";
import { IconAlertCircle, IconLock } from "@tabler/icons-react";
import FormText from "@acme/virtual-form/text";
import FormDebugInfo from "@acme/virtual-form/debug-info";
import FormSwitch from "@acme/virtual-form/switch";
import { Checkbox } from "@acme/ui/checkbox";
import FormDate from "@acme/virtual-form/date2";
import FormEnum from "@acme/virtual-form/enum";

const FormSchema = z.object({
  date: z.string().optional(),
});

function TestPage() {
  const [data, setData] = useState<z.infer<typeof FormSchema>>({
    date: "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    // resolver: zodResolver(FormSchema),
    values: data,
    // mode: "all",
    // reValidateMode: "onChange",
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
          className="flex flex-col gap-4 p-4"
          onChange={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <FormDate
            {...form.register("date")}
            label="Date"
            // leftSection={<IconAlertCircle />}
            // rightSection={<IconAlertCircle />}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default TestPage;
