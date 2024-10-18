import LiveFormDate from "@acme/live-form/date";

function TestDate(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormDate {...props} />
    </div>
  );
}

export default TestDate;
