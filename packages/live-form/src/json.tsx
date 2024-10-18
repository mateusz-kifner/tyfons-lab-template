import { useLiveFormContext } from "./form";
import type { LiveFormField } from "./input-type";

interface LiveFormJSONProps
  extends LiveFormField<Record<string, any> | Array<any>> {}

const LiveFormJSON = (props: LiveFormJSONProps) => {
  const { value } = useLiveFormContext(props);
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
