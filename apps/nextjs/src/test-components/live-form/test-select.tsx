import VirtualFormSelect from "@acme/live-form/select";

function TestSelect(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormSelect options={["test1", "test2", "test3"]} {...props} />;
}

export default TestSelect;
