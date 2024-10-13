import VirtualFormDatetime from "@acme/virtual-form/datetime";

function TestDatetime(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormDatetime {...props} />;
}

export default TestDatetime;
