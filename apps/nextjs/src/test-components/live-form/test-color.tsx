import LiveFormColor from "@acme/live-form/color";

function TestColor(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormColor {...props} />
    </div>
  );
}

export default TestColor;
