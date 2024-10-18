import VirtualFormJSON from "@acme/live-form/json";

function TestJSON(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormJSON {...props} />;
}

export default TestJSON;
