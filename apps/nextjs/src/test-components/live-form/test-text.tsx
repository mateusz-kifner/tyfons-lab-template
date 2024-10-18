import VirtualFormText from "@acme/live-form/text";

function TestText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormText {...props} />;
}

export default TestText;
