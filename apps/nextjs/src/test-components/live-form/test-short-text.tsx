import LiveFormShortText from "@acme/live-form/short-text";
import { IconBug } from "@tabler/icons-react";

function TestShortText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <LiveFormShortText {...props} />
      <LiveFormShortText leftSection={<IconBug />} {...props} />
      <LiveFormShortText rightSection={<IconBug />} {...props} />
      <LiveFormShortText
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestShortText;
