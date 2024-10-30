"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Suspense } from "react";
import { cn } from "@acme/ui";
import { IconLoader2 } from "@tabler/icons-react";
import { type ComponentType, useId } from "react";
import type { GetStaticProps } from "next";
import { ThemeToggle } from "@acme/ui/theme";
import dynamic from "next/dynamic";

const TestAccordion = dynamic(
  () => import("@/test-components/shadcn/test-accordion"),
  { ssr: false },
);
const TestAlert = dynamic(() => import("@/test-components/shadcn/test-alert"), {
  ssr: false,
});
const TestAlertDialog = dynamic(
  () => import("@/test-components/shadcn/test-alert-dialog"),
  { ssr: false },
);
const TestAspectRatio = dynamic(
  () => import("@/test-components/shadcn/test-aspect-ratio"),
  { ssr: false },
);
const TestBadge = dynamic(() => import("@/test-components/shadcn/test-badge"), {
  ssr: false,
});
const TestBreadcrumb = dynamic(
  () => import("@/test-components/shadcn/test-breadcrumb"),
  { ssr: false },
);
const TestButton = dynamic(
  () => import("@/test-components/shadcn/test-button"),
  { ssr: false },
);
const TestCalendar = dynamic(
  () => import("@/test-components/shadcn/test-calendar"),
  { ssr: false },
);

const TestCard = dynamic(() => import("@/test-components/shadcn/test-card"), {
  ssr: false,
});
const TestCarousel = dynamic(
  () => import("@/test-components/shadcn/test-carousel"),
  { ssr: false },
);
const TestChart = dynamic(() => import("@/test-components/shadcn/test-chart"), {
  ssr: false,
});
const TestCheckbox = dynamic(
  () => import("@/test-components/shadcn/test-checkbox"),
  { ssr: false },
);
const TestCollapsible = dynamic(
  () => import("@/test-components/shadcn/test-collapsible"),
  { ssr: false },
);
const TestCombobox = dynamic(
  () => import("@/test-components/shadcn/test-combobox"),
  { ssr: false },
);
const TestCommand = dynamic(
  () => import("@/test-components/shadcn/test-command"),
  { ssr: false },
);
const TestContextMenu = dynamic(
  () => import("@/test-components/shadcn/test-context-menu"),
  { ssr: false },
);
const TestDialog = dynamic(
  () => import("@/test-components/shadcn/test-dialog"),
  { ssr: false },
);
const TestDrawer = dynamic(
  () => import("@/test-components/shadcn/test-drawer"),
  { ssr: false },
);
const TestDropdownMenu = dynamic(
  () => import("@/test-components/shadcn/test-dropdown-menu"),
  { ssr: false },
);
const TestForm = dynamic(() => import("@/test-components/shadcn/test-form"), {
  ssr: false,
});
const TestHoverCard = dynamic(
  () => import("@/test-components/shadcn/test-hover-card"),
  { ssr: false },
);
const TestInputOTP = dynamic(
  () => import("@/test-components/shadcn/test-input-otp"),
  { ssr: false },
);
const TestInput = dynamic(() => import("@/test-components/shadcn/test-input"), {
  ssr: false,
});
const TestLabel = dynamic(() => import("@/test-components/shadcn/test-label"), {
  ssr: false,
});
const TestMenubar = dynamic(
  () => import("@/test-components/shadcn/test-menubar"),
  { ssr: false },
);
const TestNavigationMenu = dynamic(
  () => import("@/test-components/shadcn/test-navigation-menu"),
  { ssr: false },
);
const TestPagination = dynamic(
  () => import("@/test-components/shadcn/test-pagination"),
  { ssr: false },
);
const TestPaginationPrimitive = dynamic(
  () => import("@/test-components/shadcn/test-pagination-primitive"),
  { ssr: false },
);
const TestPopover = dynamic(
  () => import("@/test-components/shadcn/test-popover"),
  { ssr: false },
);
const TestProgress = dynamic(
  () => import("@/test-components/shadcn/test-progress"),
  { ssr: false },
);
const TestRatioGroup = dynamic(
  () => import("@/test-components/shadcn/test-ratio-group"),
  { ssr: false },
);
const TestResizable = dynamic(
  () => import("@/test-components/shadcn/test-resizable"),
  { ssr: false },
);
const TestScrollArea = dynamic(
  () => import("@/test-components/shadcn/test-scroll-area"),
  { ssr: false },
);
const TestSelect = dynamic(
  () => import("@/test-components/shadcn/test-select"),
  { ssr: false },
);
const TestSeparator = dynamic(
  () => import("@/test-components/shadcn/test-separator"),
  { ssr: false },
);
const TestSheet = dynamic(() => import("@/test-components/shadcn/test-sheet"), {
  ssr: false,
});
const TestSkeleton = dynamic(
  () => import("@/test-components/shadcn/test-skeleton"),
  { ssr: false },
);
const TestSlider = dynamic(
  () => import("@/test-components/shadcn/test-slider"),
  { ssr: false },
);
const TestSonner = dynamic(
  () => import("@/test-components/shadcn/test-sonner"),
  { ssr: false },
);
const TestSwitch = dynamic(
  () => import("@/test-components/shadcn/test-switch"),
  { ssr: false },
);
const TestTable = dynamic(() => import("@/test-components/shadcn/test-table"), {
  ssr: false,
});
const TestTabs = dynamic(() => import("@/test-components/shadcn/test-tabs"), {
  ssr: false,
});
const TestTextarea = dynamic(
  () => import("@/test-components/shadcn/test-textarea"),
  { ssr: false },
);
const TestToggle = dynamic(
  () => import("@/test-components/shadcn/test-toggle"),
  { ssr: false },
);
const TestTooltip = dynamic(
  () => import("@/test-components/shadcn/test-tooltip"),
  { ssr: false },
);

const UIElements: {
  title: string;
  description?: string;
  Element: ComponentType;
  className?: string;
}[] = [
  {
    title: "Accordion",
    Element: TestAccordion,
  },
  {
    title: "Alert",
    Element: TestAlert,
    className: "flex-col",
  },
  {
    title: "AlertDialog",
    Element: TestAlertDialog,
  },
  {
    title: "AspectRatio",
    description: "16 / 9",
    Element: TestAspectRatio,
  },
  {
    title: "Badge",
    Element: TestBadge,
  },
  {
    title: "Breadcrumb",
    Element: TestBreadcrumb,
  },
  {
    title: "Button",
    Element: TestButton,
    className: "flex-col",
  },
  {
    title: "Calendar",
    Element: TestCalendar,
  },
  {
    title: "Card",
    Element: TestCard,
  },
  {
    title: "Carousel",
    Element: TestCarousel,
    className: "justify-center",
  },
  {
    title: "Chart",
    Element: TestChart,
  },
  {
    title: "Checkbox",
    Element: TestCheckbox,
    className: "flex-col",
  },
  {
    title: "Collapsible",
    Element: TestCollapsible,
    className: "flex-col",
  },
  {
    title: "Combobox",
    Element: TestCombobox,
  },
  {
    title: "Command",
    Element: TestCommand,
  },
  {
    title: "ContextMenu",
    Element: TestContextMenu,
  },
  {
    title: "Dialog",
    Element: TestDialog,
  },
  {
    title: "Drawer",
    Element: TestDrawer,
  },
  {
    title: "DropdownMenu",
    Element: TestDropdownMenu,
    className: "justify-center",
  },

  {
    title: "Form",
    Element: TestForm,
  },
  {
    title: "HoverCard",
    Element: TestHoverCard,
    className: "justify-center",
  },
  {
    title: "InputOTP",
    Element: TestInputOTP,
    className: "flex-col",
  },
  {
    title: "Input",
    Element: TestInput,
    className: "flex-col",
  },
  {
    title: "Label",
    Element: TestLabel,
    className: "flex-col",
  },
  {
    title: "Menubar",
    Element: TestMenubar,
  },
  {
    title: "NavigationMenu",
    Element: TestNavigationMenu,
  },
  {
    title: "Pagination",
    Element: TestPagination,
    className: "flex-col",
  },
  {
    title: "Pagination Primitive",
    Element: TestPaginationPrimitive,
    className: "flex-col",
  },
  {
    title: "Popover",
    Element: TestPopover,
  },
  {
    title: "Progress",
    Element: TestProgress,
  },
  {
    title: "RatioGroup",
    Element: TestRatioGroup,
  },
  {
    title: "Resizable",
    Element: TestResizable,
  },
  {
    title: "ScrollArea",
    Element: TestScrollArea,
  },
  {
    title: "Select",
    Element: TestSelect,
    className: "flex-col",
  },
  {
    title: "Separator",
    Element: TestSeparator,
  },
  {
    title: "Sheet",
    Element: TestSheet,
  },
  {
    title: "Skeleton",
    Element: TestSkeleton,
    className: "flex-col",
  },
  {
    title: "Slider",
    Element: TestSlider,
    className: "flex-col gap-7 pb-7",
  },
  {
    title: "Sonner",
    Element: TestSonner,
  },
  {
    title: "Switch",
    Element: TestSwitch,
  },
  {
    title: "Table",
    Element: TestTable,
  },
  {
    title: "Tabs",
    Element: TestTabs,
    className: "justify-center",
  },
  {
    title: "TextArea",
    Element: TestTextarea,
    className: "flex-col",
  },
  {
    title: "Toggle",
    Element: TestToggle,
    className: "flex-col",
  },
  {
    title: "Tooltip",
    Element: TestTooltip,
    className: "flex-col",
  },
];

function ShadCN() {
  // const { toggleTheme, theme } = useUserContext();
  const uuid = useId();
  console.log("test");
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-4 p-2 pb-96">
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
              <val.Element />
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ShadCN;

// export const getStaticProps: GetStaticProps = () => {
//   if (process.env.NODE_ENV === "production") {
//     return { notFound: true };
//   }
//   return { props: {} };
// };
