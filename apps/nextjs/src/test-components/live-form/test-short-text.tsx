import VirtualFormShortText from "@acme/live-form/short-text";
import { IconBug } from "@tabler/icons-react";

function TestShortText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <VirtualFormShortText {...props} />
      <VirtualFormShortText leftSection={<IconBug />} {...props} />
      <VirtualFormShortText rightSection={<IconBug />} {...props} />
      <VirtualFormShortText
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestShortText;
