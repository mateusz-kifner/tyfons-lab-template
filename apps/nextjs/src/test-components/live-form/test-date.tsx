import LiveFormDate from "@acme/live-form/date";
import { IconBug } from "@tabler/icons-react";

function TestDate(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormDate {...props} />
      <LiveFormDate leftSection={null} {...props} />
      <LiveFormDate leftSection={<IconBug />} {...props} />
      <LiveFormDate rightSection={<IconBug />} {...props} />
      <LiveFormDate
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestDate;
