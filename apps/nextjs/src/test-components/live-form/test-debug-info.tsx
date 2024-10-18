import LiveFormDebugInfo from "@acme/live-form/debug-info";

function TestDebugInfo(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormDebugInfo {...props} />
      <LiveFormDebugInfo {...props} value="Ala ma kota" />
      <LiveFormDebugInfo {...props} value="[test]: test" />
    </div>
  );
}

export default TestDebugInfo;
