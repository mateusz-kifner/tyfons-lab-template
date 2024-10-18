import LiveFormDatetime from "@acme/live-form/datetime";

function TestDatetime(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormDatetime {...props} />
    </div>
  );
}

export default TestDatetime;
