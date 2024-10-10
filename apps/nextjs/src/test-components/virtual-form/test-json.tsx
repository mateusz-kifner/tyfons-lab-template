import VirtualFormJSON from "@acme/virtual-form/json";

function TestJSON({ name }: { name: string | number }) {
  return <VirtualFormJSON name={name} />;
}

export default TestJSON;
