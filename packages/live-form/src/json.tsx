import { useVirtualFormContext } from "./form";
import type { VirtualFormField } from "./input-type";

interface LiveFormJSONProps extends VirtualFormField<string> {}

const LiveFormJSON = (props: LiveFormJSONProps) => {
  const { value } = useVirtualFormContext(props);
  return (
    <div className="flex-grow">
      <code
        style={{
          overflow: "hidden",
          maxWidth: "100%",
          padding: "0",
          boxSizing: "border-box",
          whiteSpace: "pre",
        }}
      >
        {JSON.stringify(value, null, 2)}
      </code>
    </div>
  );
};

export default LiveFormJSON;
