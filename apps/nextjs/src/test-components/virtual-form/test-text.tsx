import VirtualFormText from "@acme/virtual-form/text";

function TestText({ name }: { name: string | number }) {
  return <VirtualFormText name={name} />;
}

export default TestText;
