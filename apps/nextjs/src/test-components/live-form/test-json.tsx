import LiveFormJSON from "@acme/live-form/json";

function TestJSON(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormJSON {...props} />
      <LiveFormJSON {...props} value={[1, 2, 3]} />
      <LiveFormJSON {...props} value={{ test: { test: "test" } }} />
    </div>
  );
}

export default TestJSON;
