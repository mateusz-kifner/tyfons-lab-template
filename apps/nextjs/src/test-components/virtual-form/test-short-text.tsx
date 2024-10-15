import VirtualFormShortText from "../../../../../packages/live-form/dist/src/short-text";

function TestShortText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormShortText {...props} />;
}

export default TestShortText;
