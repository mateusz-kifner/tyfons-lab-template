import VirtualFormDate from "@acme/virtual-form/date";

function TestDate({ name }: { name: string | number }) {
  return <VirtualFormDate name={name} />;
}

export default TestDate;
