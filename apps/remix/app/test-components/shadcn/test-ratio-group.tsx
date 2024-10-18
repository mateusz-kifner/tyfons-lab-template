import { Label } from "@acme/ui/label";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";

function TestRatioGroup() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1" label="Default" />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2" label="Comfortable" />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3" label="Compact" />
      </div>
    </RadioGroup>
  );
}

export default TestRatioGroup;
