import VirtualFormSwitch from "@acme/virtual-form/switch";

function TestSwitch(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormSwitch {...props} />;
}

export default TestSwitch;
