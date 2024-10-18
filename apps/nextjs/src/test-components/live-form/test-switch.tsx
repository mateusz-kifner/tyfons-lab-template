import VirtualFormSwitch from "@acme/live-form/switch";

function TestSwitch(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormSwitch {...props} />;
}

export default TestSwitch;
