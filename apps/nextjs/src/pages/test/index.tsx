"use client";
import { toast } from "sonner";
import { type ComponentType, lazy, Suspense, useId, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@acme/ui";
import { ThemeToggle } from "@acme/ui/theme";
import VirtualForm from "../../../../../packages/virtual-form/dist/src/form";
import TestVirtualForm from "@/test-components/virtual-form/test-virtual-form";

const TestDate = lazy(() => import("@/test-components/virtual-form/test-date"));
const TestDatetime = lazy(
  () => import("@/test-components/virtual-form/test-datetime"),
);
const TestDebugInfo = lazy(
  () => import("@/test-components/virtual-form/test-debug-info"),
);
const TestJSON = lazy(() => import("@/test-components/virtual-form/test-json"));
const TestSelect = lazy(
  () => import("@/test-components/virtual-form/test-select"),
);
const TestShortText = lazy(
  () => import("@/test-components/virtual-form/test-short-text"),
);
const TestSwitch = lazy(
  () => import("@/test-components/virtual-form/test-switch"),
);
const TestText = lazy(() => import("@/test-components/virtual-form/test-text"));

const UIElements: {
  title: string;
  description?: string;
  Element: ComponentType<{
    name: string | number;
  }>;
  className?: string;
  name: string | number;
  default: any;
}[] = [
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
    default: '{"test":"ala ma kota"}',
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

function VirtualFormTestPage() {
  const uuid = useId();
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col gap-4 p-2 pb-96">
      <ThemeToggle />
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
              <TestVirtualForm defaultData={val.default} name={val.name}>
                <val.Element name="data" />
              </TestVirtualForm>
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default VirtualFormTestPage;
