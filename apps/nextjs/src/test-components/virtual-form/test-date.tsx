import VirtualFormDate from "@acme/virtual-form/date";

function TestDate(props: Record<string, any> & { name: string | number }) {
  return <VirtualFormDate {...props} />;
}

export default TestDate;
