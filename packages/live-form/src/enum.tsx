import { Label } from "@acme/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import useTranslation from "@/hooks/useTranslation";
import type LiveFormInput from "./live-form";
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import { useId } from "react";
import { useLiveFormContext } from "./LiveForm";
import { cn } from "@acme/ui";

//  RadixSelectProps {
//   children?: React.ReactNode;
//   value?: string;
//   defaultValue?: string;
//   onValueChange?(value: string): void;
//   open?: boolean;
//   defaultOpen?: boolean;
//   onOpenChange?(open: boolean): void;
//   dir?: Direction;
//   name?: string;
//   autoComplete?: string;
//   disabled?: boolean;
//   required?: boolean;
// }

interface LiveFormEnumProps extends LiveFormInput<string>, RadixSelectProps {
  enum_data: string[];
  collapse?: boolean;
}

const LiveFormEnum = (props: LiveFormEnumProps) => {
  const {
    enum_data,
    label,
    value,
    onSubmit,
    disabled,
    required,
    collapse = false,
    keyName,
    rightSection,
    leftSection,
    data,
    ...moreProps
  } = useLiveFormContext(props);
  const t = useTranslation();
  const uuid = useId();

  return (
    <div className={cn("flex flex-grow", collapse ? "gap-3 pt-3" : "flex-col")}>
      <Label
        label={label}
        copyValue={t[value as keyof typeof t] as string}
        required={required}
      />
      <Select
        value={value}
        onValueChange={(value) => {
          onSubmit?.(value);
        }}
        disabled={disabled}
        {...moreProps}
      >
        <SelectTrigger>
          <SelectValue placeholder={`${t.select} ...`} />
        </SelectTrigger>
        <SelectContent>
          {enum_data.map((val, index) => (
            <SelectItem value={val} key={`${uuid}:${index}`}>
              {(t[val as keyof typeof t] as string | undefined) ?? val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LiveFormEnum;
