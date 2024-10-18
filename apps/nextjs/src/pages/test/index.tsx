"use client";
import { toast } from "sonner";
import { type ComponentType, Suspense, useId, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { IconBug, IconBugOff, IconLoader2 } from "@tabler/icons-react";
import { cn } from "@acme/ui";
import { ThemeToggle } from "@acme/ui/theme";
import TestLiveForm from "@/test-components/live-form/test-virtual-form";
import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@acme/ui/button";
import dynamic from "next/dynamic";

const TestColor = dynamic(
  () => import("@/test-components/live-form/test-color"),
  { ssr: false },
);

const TestDate = dynamic(
  () => import("@/test-components/live-form/test-date"),
  { ssr: false },
);
const TestDatetime = dynamic(
  () => import("@/test-components/live-form/test-datetime"),
  { ssr: false },
);
const TestDebugInfo = dynamic(
  () => import("@/test-components/live-form/test-debug-info"),
  { ssr: false },
);
const TestJSON = dynamic(
  () => import("@/test-components/live-form/test-json"),
  { ssr: false },
);
const TestSelect = dynamic(
  () => import("@/test-components/live-form/test-select"),
  { ssr: false },
);
const TestShortText = dynamic(
  () => import("@/test-components/live-form/test-short-text"),
  { ssr: false },
);
const TestSwitch = dynamic(
  () => import("@/test-components/live-form/test-switch"),
  { ssr: false },
);
const TestText = dynamic(
  () => import("@/test-components/live-form/test-text"),
  { ssr: false },
);

const UIElements: {
  title: string;
  description?: string;
  Element: ComponentType<
    Record<string, any> & {
      name: string | number;
      label?: any;
    }
  >;
  className?: string;
  name: string | number;
  default: any;
}[] = [
  {
    title: "Test Color",
    Element: TestColor,
    name: "testColor",
    default: "#ff0000",
  },
  {
    title: "Test Date",
    Element: TestDate,
    name: "testDate",
    default: "2022-01-01",
  },
  {
    title: "Test Datetime",
    Element: TestDatetime,
    name: "testDatetime",
    default: "2022-01-01",
  },
  {
    title: "Test Debug Info",
    Element: TestDebugInfo,
    name: "testDebugInfo",
    default: "TESTID",
  },
  {
    title: "Test JSON",
    Element: TestJSON,
    name: "testJSON",
    default: { test: "ala ma kota" },
  },
  {
    title: "Test Select",
    Element: TestSelect,
    name: "testSelect",
    default: "test1",
  },

  {
    title: "Test Short Text",
    Element: TestShortText,
    name: "testShortText",
    default: "test",
  },
  {
    title: "Test Switch",
    Element: TestSwitch,
    name: "testSwitch",
    default: false,
  },
  {
    title: "Test Text",
    Element: TestText,
    name: "testText",
    default: "test",
  },
];

function LiveFormTestPage() {
  const uuid = useId();
  const [debug, setDebug] = useLocalStorage({
    key: "debug",
    defaultValue: "false",
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col gap-4 p-2 pb-96">
      <div className="flex gap-4">
        <ThemeToggle />
        <Button
          size="icon"
          className="flex-col"
          onClick={() => setDebug((v) => (v === "true" ? "false" : "true"))}
        >
          {debug === "true" ? <IconBug /> : <IconBugOff />}
        </Button>
      </div>
      {UIElements.map((val, index) => (
        <Card key={`${uuid}${index}:`}>
          <CardHeader>
            <CardTitle>{val.title}</CardTitle>
            {val.description !== undefined && (
              <CardDescription>{val.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className={cn("flex gap-2 p-2", val.className)}>
            <Suspense
              fallback={
                <IconLoader2 className="direction-reverse animate-spin" />
              }
            >
              <TestLiveForm defaultData={val.default} name={val.name}>
                <val.Element name="data" label={val.title} />
              </TestLiveForm>
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default LiveFormTestPage;
