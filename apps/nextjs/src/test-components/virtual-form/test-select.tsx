import VirtualFormSelect from "@acme/virtual-form/select";

function TestSelect({ name }: { name: string | number }) {
  return (
    <VirtualFormSelect name={name} options={["test1", "test2", "test3"]} />
  );
}

export default TestSelect;
