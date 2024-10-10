import VirtualFormJSON from "@acme/virtual-form/json";

function TestJSON(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormJSON {...props} />;
}

export default TestJSON;
