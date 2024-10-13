import VirtualFormDebugInfo from "@acme/virtual-form/debug-info";

function TestDebugInfo(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormDebugInfo {...props} />;
}

export default TestDebugInfo;
