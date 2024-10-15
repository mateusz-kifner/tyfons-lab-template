import VirtualFormSwitch from "../../../../../packages/live-form/dist/src/switch";

function TestSwitch(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormSwitch {...props} />;
}

export default TestSwitch;
