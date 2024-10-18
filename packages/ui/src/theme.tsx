"use client";

import { Button } from "./button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import useColorScheme, { colorSchemes } from "./useColorScheme";
import { useId } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import useTheme from "./useTheme";

function ThemeToggle() {
  const { setTheme } = useTheme();
  const { setColorScheme } = useColorScheme();
  const uuid = useId();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IconSun className="dark:-rotate-90 size-5 rotate-0 scale-100 transition-all dark:scale-0" />
          <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {colorSchemes.map((color, index) => (
          <DropdownMenuItem
            key={`${uuid}:${index}`}
            onClick={() => setColorScheme?.(color)}
          >
            {color}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme?.("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme?.("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ThemeToggle };
