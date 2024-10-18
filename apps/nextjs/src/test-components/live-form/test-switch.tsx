import VirtualFormSwitch from "@acme/live-form/switch";

function TestSwitch(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex flex-col gap-2">
      <VirtualFormSwitch variant="color" {...props} />
      <VirtualFormSwitch {...props} />
    </div>
  );
}

export default TestSwitch;
