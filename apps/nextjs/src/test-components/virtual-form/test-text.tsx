import VirtualFormText from "../../../../../packages/live-form/dist/src/text";

function TestText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormText {...props} />;
}

export default TestText;
