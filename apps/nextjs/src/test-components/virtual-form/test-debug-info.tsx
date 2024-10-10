import VirtualFormDebugInfo from "@acme/virtual-form/debug-info";

function TestDebugInfo(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormDebugInfo {...props} />;
}

export default TestDebugInfo;
