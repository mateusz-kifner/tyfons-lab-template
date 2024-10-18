import VirtualFormDate from "@acme/live-form/date";

function TestDate(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormDate {...props} />;
}

export default TestDate;
