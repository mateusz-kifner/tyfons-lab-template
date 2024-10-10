import VirtualFormDatetime from "@acme/virtual-form/datetime";

function TestDatetime({ name }: { name: string | number }) {
  return <VirtualFormDatetime name={name} />;
}

export default TestDatetime;
