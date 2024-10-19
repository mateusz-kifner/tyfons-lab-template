import LiveFormDatetime from "@acme/live-form/datetime";
import { IconBug } from "@tabler/icons-react";

function TestDatetime(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormDatetime {...props} />
      <LiveFormDatetime leftSection={null} {...props} />
      <LiveFormDatetime leftSection={<IconBug />} {...props} />
      <LiveFormDatetime rightSection={<IconBug />} {...props} />
      <LiveFormDatetime
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestDatetime;
