import LiveFormColor from "@acme/live-form/color";
import { IconBug } from "@tabler/icons-react";

function TestColor(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormColor {...props} />
      <LiveFormColor leftSection={<IconBug />} {...props} />
      <LiveFormColor rightSection={<IconBug />} {...props} />
      <LiveFormColor
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestColor;
