import VirtualFormDatetime from "../../../../../packages/live-form/dist/src/datetime";

function TestDatetime(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormDatetime {...props} />;
}

export default TestDatetime;
