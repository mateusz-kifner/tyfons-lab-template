import VirtualForm from "@acme/virtual-form/form";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

function TestVirtualForm({
  children,
  defaultData,
  name,
}: { children: ReactNode; defaultData?: any; name: number | string }) {
  const [data, setData] = useState({ data: defaultData });

  return (
    <VirtualForm
      data={data}
      onChange={(_, val) => {
        setData({ data: val });
        toast(`${name} ${val}`);
      }}
    >
      {children}
    </VirtualForm>
  );
}

export default TestVirtualForm;
