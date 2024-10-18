import LiveForm from "@acme/live-form/form";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

function TestLiveForm({
  children,
  defaultData,
  name,
}: { children: ReactNode; defaultData?: any; name: number | string }) {
  const [data, setData] = useState({ data: defaultData });

  return (
    <LiveForm
      data={data}
      onChange={(_, val) => {
        setData({ data: val });
        toast(`${name} ${val}`);
      }}
    >
      {children}
    </LiveForm>
  );
}

export default TestLiveForm;
