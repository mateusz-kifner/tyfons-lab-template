import VirtualFormShortText from "@acme/live-form/short-text";

function TestShortText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormShortText {...props} />;
}

export default TestShortText;
