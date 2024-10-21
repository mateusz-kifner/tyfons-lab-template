import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { useClickOutside } from "@mantine/hooks";

import { buttonVariants } from "@acme/ui/button";
import ColorPicker from "@acme/ui/color-picker";
import { Label } from "@acme/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/popover";
import { cn } from "@acme/ui";
import { IconColorSwatch } from "@tabler/icons-react";
import tinycolor, { type ColorFormats } from "tinycolor2";
import type { LiveFormField } from "./input-type";
import { useLiveFormContext } from "./form";
import equalHSV from "@acme/ui/color-picker-parts/equalHSV";
import { colorNames } from "@acme/ui/color-picker-parts/color-names";
// Scroll in color palette will not work in modal due to radix bug (25.05.2023)

const colorNameKeys = Object.keys(colorNames);
const colorNamesRGB: [number, number, number][] = colorNameKeys.map((val) => [
  Number.parseInt(val.substring(1, 3), 16),
  Number.parseInt(val.substring(3, 5), 16),
  Number.parseInt(val.substring(5, 7), 16),
]);

export const getColorNameFromHex = (hex: string) => {
  let name = "Nieznany";
  if (colorNames[hex as keyof typeof colorNames] !== undefined) {
    name = colorNames[hex as keyof typeof colorNames];
  } else {
    let min = 100000.0;
    let min_index = -1;

    const hex_r = Number.parseInt(hex.substring(1, 3), 16);
    const hex_g = Number.parseInt(hex.substring(3, 5), 16);
    const hex_b = Number.parseInt(hex.substring(5, 7), 16);

    colorNamesRGB.forEach(([val_r, val_g, val_b], index) => {
      const weight = Math.sqrt(
        (val_r - hex_r) * (val_r - hex_r) +
          (val_g - hex_g) * (val_g - hex_g) +
          (val_b - hex_b) * (val_b - hex_b),
      );
      if (min > weight) {
        min = weight;
        min_index = index;
      }
    });

    if (min_index !== -1) {
      name = `${
        colorNames[colorNameKeys[min_index] as keyof typeof colorNames]
      }*`;
    }
  }
  return name;
};

interface LiveFormColorProps extends LiveFormField<string | null> {
  style?: CSSProperties;
}

const LiveFormColor = (props: LiveFormColorProps) => {
  const {
    label,
    value,
    onChange,
    disabled,
    required,
    // style,
    leftSection = <IconColorSwatch />,
    rightSection,
    // keyName,
  } = useLiveFormContext(props);
  const [open, setOpen] = useState(false);
  const uuid = useId();
  const [colorText, setColorText] = useState<string | null>(
    !!value && value.length > 3 ? value : null,
  );

  // const ref = useClickOutside(() => setFocus(false));
  const colorTextObj = tinycolor(colorText ?? "");
  const colorTextHSV = colorTextObj.toHsv();
  const [color, setColor] = useState({
    ...colorTextHSV,
    h: colorTextHSV.h / 360,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const setColorViaString = (val: string) => {
    onChange(val);
    const valHSV = tinycolor(val).toHsv();
    setColor((prev) => (equalHSV(valHSV, prev) ? prev : valHSV));
  };

  const setColorViaHSVObj = (val: ColorFormats.HSVA) => {
    const valObj = tinycolor.fromRatio(val);
    let hex = valObj.toHex8String();
    if (hex.substring(7) === "ff") {
      hex = hex.substring(0, 7);
    }
    onChange(hex);
    setColor((prev) => (equalHSV(val, prev) ? prev : val));
  };

  // const onLoseFocus = () => {
  //   if (colorText !== value) {
  //     if (!colorText || colorText === null) {
  //       onChange?.(undefined);
  //       setColorText(null);
  //       return;
  //     }
  //     const colorObj = tinycolor(colorText);
  //     if (colorObj.isValid()) {
  //       let hex = colorObj.toHex8String();
  //       if (hex.substring(7) === "ff") {
  //         hex = hex.substring(0, 7);
  //       }
  //       onChange?.(hex);
  //       setColorText(hex);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const valueObj = tinycolor(value);
  //   const valueHSV = { ...valueObj.toHsv(), h: valueObj.toHsv().h / 360 };
  //   if (equalHSV(valueHSV, color)) {
  //     setColorViaHSVObj(valueHSV);
  //   }
  // }, [value]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This is intended to be focused with keyboard or mouse, no onPress needed
    <div
      className="flex-grow"
      // onClick={() => !disabled && setFocus(true)}
      // onFocus={() => !disabled && setFocus(true)}
      // ref={ref}
    >
      <Label
        label={label}
        copyValue={colorText ?? ""}
        htmlFor={`inputColor_${uuid}`}
      />
      <Popover onOpenChange={setOpen} open={open} modal={true}>
        <PopoverTrigger
          className={cn(
            buttonVariants({ size: "icon", variant: "ghost" }),
            "h-8 w-8 text-stone-900 dark:text-stone-200",
          )}
        >
          {rightSection ? rightSection : <IconColorSwatch />}
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          // container={ref.current}
          align="start"
          sideOffset={5}
          className="w-[420px] overflow-hidden rounded border-gray-400 bg-stone-200 pb-3 shadow data-[state=open]:animate-show dark:border-sky-600 dark:bg-stone-800 p-0"
        >
          <ColorPicker value={color} onChange={setColorViaHSVObj} />
        </PopoverContent>
      </Popover>

      <input
        type="text"
        autoCorrect="false"
        spellCheck="false"
        id={`inputColor_${uuid}`}
        name={`inputColor_${uuid}`}
        value={colorText ?? ""}
        onChange={(e) => setColorViaString(e.target.value)}
        className={
          "w-full resize-none whitespace-pre-line break-words bg-transparent py-1 text-sm outline-none focus-visible:border-transparent focus-visible:outline-none data-disabled:text-gray-500 dark:data-disabled:text-gray-500"
        }
        readOnly={disabled}
        required={required}
        autoComplete="off"
        ref={inputRef}
      />
    </div>
  );
  //   // biome-ignore lint/a11y/useKeyWithClickEvents: This is intended to be focused with keyboard or mouse, no onPress needed
  //   <div
  //     className="flex-grow"
  //     // onClick={() => !disabled && setFocus(true)}
  //     // onFocus={() => !disabled && setFocus(true)}
  //     // ref={ref}
  //   >
  //     <Label
  //       label={label}
  //       copyValue={colorText ?? ""}
  //       htmlFor={`inputColor_${uuid}`}
  //     />
  //     {/* <DisplayCell
  //       className={!colorTextObj.isValid() ? "border-red-500" : ""}
  //       leftSection={
  //         leftSection ? (
  //           leftSection
  //         ) : (
  //           <div
  //             className="before:-z-10 relative h-6 w-6 rounded-full before:absolute before:top-[0.0625rem] before:left-[0.0625rem] before:h-[1.375rem] before:w-[1.375rem] before:rounded-full before:bg-white"
  //             style={{ background: colorText ?? "" }}
  //           />
  //         )
  //       }
  //       rightSection={*/}
  //     <Popover onOpenChange={setOpen} open={open} modal={true}>
  //       <PopoverTrigger
  //         className={cn(
  //           buttonVariants({ size: "icon", variant: "ghost" }),
  //           "h-8 w-8 text-stone-900 dark:text-stone-200",
  //         )}
  //       >
  //         {rightSection ? (
  //           rightSection
  //         ) : (
  //           // <div className="flex h-11 items-center justify-center">
  //           <IconColorSwatch />
  //           // </div>
  //         )}
  //       </PopoverTrigger>
  //       <PopoverContent
  //         align="end"
  //         sideOffset={5}
  //         className="w-[420px] overflow-hidden rounded border-gray-400 bg-stone-200 pb-3 shadow data-[state=open]:animate-show dark:border-sky-600 dark:bg-stone-800"
  //       >
  //         <ColorPicker value={color} onChange={setColorViaHSVObj} />
  //       </PopoverContent>
  //     </Popover>
  //     {/*   }
  //        focus={focus}
  //      > */}
  //     <input
  //       type="text"
  //       autoCorrect="false"
  //       spellCheck="false"
  //       id={`inputColor_${uuid}`}
  //       name={`inputColor_${uuid}`}
  //       value={colorText ?? ""}
  //       onChange={(e) => setColorViaString(e.target.value)}
  //       className={
  //         "w-full resize-none whitespace-pre-line break-words bg-transparent py-1 text-sm outline-none focus-visible:border-transparent focus-visible:outline-none data-disabled:text-gray-500 dark:data-disabled:text-gray-500"
  //       }
  //       readOnly={disabled}
  //       required={required}
  //       autoComplete="off"
  //       ref={inputRef}
  //     />
  //   </div>
  // );
};

export default LiveFormColor;
