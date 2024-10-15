import VirtualFormJSON from "../../../../../packages/live-form/dist/src/json";

function TestJSON(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormJSON {...props} />;
}

export default TestJSON;
