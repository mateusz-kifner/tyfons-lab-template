import LiveFormSelect from "@acme/live-form/select";

function TestSelect(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  const options2 = Array.from({ length: 100 }).map((_, i) => `test${i + 100}`);
  const options3 = Array.from({ length: 1000 }).map(
    (_, i) => `test${i + 1000}`,
  );
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormSelect options={["test1", "test2", "test3"]} {...props} />
      <LiveFormSelect options={options2} {...props} value="test100" />
      <LiveFormSelect options={options3} {...props} value="test1000" />
    </div>
  );
}

export default TestSelect;
