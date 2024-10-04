import type LiveFormInput from "./live-form";
import { useLiveFormContext } from "./LiveForm";

interface LiveFormJSONProps extends LiveFormInput<string> {}

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
