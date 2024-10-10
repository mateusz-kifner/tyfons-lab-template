import VirtualFormSelect from "@acme/virtual-form/select";

function TestSelect(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormSelect options={["test1", "test2", "test3"]} {...props} />;
}

export default TestSelect;
