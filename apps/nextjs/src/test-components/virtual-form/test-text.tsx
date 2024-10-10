import VirtualFormText from "@acme/virtual-form/text";

function TestText(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormText {...props} />;
}

export default TestText;
