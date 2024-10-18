import VirtualFormText from "@acme/live-form/text";
import { IconBug } from "@tabler/icons-react";

function TestText(
  props: Record<string, any> & { name: string | number; label?: any },
) {
  return (
    <div className="flex gap-2 flex-col w-full">
      <VirtualFormText {...props} />
      <VirtualFormText leftSection={<IconBug />} {...props} />
      <VirtualFormText rightSection={<IconBug />} {...props} />
      <VirtualFormText
        leftSection={<IconBug />}
        rightSection={<IconBug />}
        {...props}
      />
    </div>
  );
}

export default TestText;
