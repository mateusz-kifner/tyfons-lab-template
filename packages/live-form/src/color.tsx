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

function validateColorString(color_str: string) {
  return tinycolor(color_str).isValid();
}

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
    leftSection,
    rightSection,
    // keyName,
  } = useLiveFormContext(props);
  const [open, setOpen] = useState(false);
  const uuid = useId();
  const ref = useClickOutside(() => setOpen(false));

  // const [colorText, setColorText] = useState<string | null>(
  //   !!value && value.length > 3 ? value : null,
  // );
  const colorTextObj = tinycolor(value ?? "");
  const colorTextHSV = colorTextObj.toHsv();
  const [color, setColor] = useState({
    ...colorTextHSV,
    h: colorTextHSV.h / 360,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const setColorViaString = (val: string) => {
    onChange(val);
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
  // useEffect(() => {
  //   const valueObj = tinycolor(value);
  //   const valueHSV = { ...valueObj.toHsv(), h: valueObj.toHsv().h / 360 };
  //   if (equalHSV(valueHSV, color)) {
  //     setColorViaHSVObj(valueHSV);
  //   }
  // }, [value]);

  const color_without_alpha = `#${tinycolor(colorTextObj).toHex()}`;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This is intended to be focused with keyboard or mouse, no onPress needed
    <div
      className="flex-grow"
      // onClick={() => !disabled && setFocus(true)}
      // onFocus={() => !disabled && setFocus(true)}
      ref={ref}
    >
      <Label label={label} copyValue={value} required={required} />
      <Popover open={open}>
        <PopoverAnchor asChild>
          <div
            data-state={open ? "open" : "closed"}
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-2 text-gray-300 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:text-stone-400 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring data-[state=open]:ring-2 dark:text-stone-600 dark:has-[:focus-visible]:text-stone-500",
              // error
              //   ? "has-[:focus-visible]:ring-yellow-500 data-[state=open]:ring-yellow-500"
              //   : undefined,
            )}
          >
            {leftSection ? (
              leftSection
            ) : (
              <div className="relative flex h-6 w-6 rounded-full overflow-clip border border-black border-solid">
                <div
                  style={{
                    background: "url('/assets/checkerboard.svg')",
                    backgroundSize: "8px 8px",
                  }}
                  className="absolute inset-0"
                />
                <div
                  style={{
                    backgroundColor: color_without_alpha,
                  }}
                  className="z-10 h-6 w-3"
                />
                <div
                  style={{
                    backgroundColor: tinycolor(colorTextObj).toRgbString(),
                  }}
                  className="z-10 h-6 w-3 "
                />
                <div
                  style={{ boxShadow: "inset 0px 0px 2px 4px #000" }}
                  className="absolute -inset-1 z-20 rounded-full"
                />
              </div>
            )}
            <input
              type="text"
              disabled={disabled}
              value={value}
              className={cn(
                "flex h-10 w-full bg-transparent text-sm text-stone-800 outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none dark:text-stone-200",
              )}
              onFocus={(e) => {
                setOpen(true);
                e.target.focus();
              }}
              onChange={(e) => setColorViaString(e.target.value)}
              ref={inputRef}
              // {...moreProps}
            />
            {!!rightSection && rightSection}
          </div>
        </PopoverAnchor>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          container={ref.current}
          align="start"
          sideOffset={5}
          className="w-[392px] overflow-hidden rounded  bg-background shadow data-[state=open]:animate-show border-border p-0"
        >
          <ColorPicker value={color} onChange={setColorViaHSVObj} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LiveFormColor;
