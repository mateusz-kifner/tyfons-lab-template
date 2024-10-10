import VirtualFormShortText from "@acme/virtual-form/short-text";

function TestShortText(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormShortText {...props} />;
}

export default TestShortText;
