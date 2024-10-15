import VirtualFormDate from "../../../../../packages/live-form/dist/src/date";

function TestDate(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return <VirtualFormDate {...props} />;
}

export default TestDate;
