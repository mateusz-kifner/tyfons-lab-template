import VirtualFormDebugInfo from "@acme/virtual-form/debug-info";

function TestDebugInfo({ name }: { name: string | number }) {
  return <VirtualFormDebugInfo name={name} />;
}

export default TestDebugInfo;
