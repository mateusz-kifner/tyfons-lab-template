import VirtualFormShortText from "@acme/virtual-form/short-text";

function TestShortText({ name }: { name: string | number }) {
  return <VirtualFormShortText name={name} />;
}

export default TestShortText;
