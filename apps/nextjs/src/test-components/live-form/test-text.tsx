import LiveFormText from "@acme/live-form/text";
import { IconBug } from "@tabler/icons-react";

function TestText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex w-full flex-col gap-2">
      <LiveFormText {...props} />
      <LiveFormText leftSection={<IconBug />} {...props} />
      <LiveFormText rightSection={<IconBug />} {...props} />
      <LiveFormText
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestText;
