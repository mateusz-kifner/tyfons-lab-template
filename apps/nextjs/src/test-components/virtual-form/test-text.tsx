import VirtualFormText from "@acme/virtual-form/text";

function TestText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormText {...props} />;
}

export default TestText;
