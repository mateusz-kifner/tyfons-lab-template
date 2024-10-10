import VirtualFormSwitch from "@acme/virtual-form/switch";

function TestSwitch({ name }: { name: string | number }) {
  return <VirtualFormSwitch name={name} />;
}

export default TestSwitch;
