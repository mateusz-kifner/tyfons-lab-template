import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Suspense, lazy } from "react";
import { cn } from "@acme/ui";
import { IconLoader2, IconMoonStars, IconSun } from "@tabler/icons-react";
import { type ComponentType, useId } from "react";
import type { GetStaticProps } from "next";

const TestAccordion = lazy(
  () => import("@/test-components/shadcn/test-accordion"),
);
const TestAlert = lazy(() => import("@/test-components/shadcn/test-alert"));
const TestAlertDialog = lazy(
  () => import("@/test-components/shadcn/test-alert-dialog"),
);
const TestAspectRatio = lazy(
  () => import("@/test-components/shadcn/test-aspect-ratio"),
);
const TestBadge = lazy(() => import("@/test-components/shadcn/test-badge"));
const TestButton = lazy(() => import("@/test-components/shadcn/test-button"));

const TestCard = lazy(() => import("@/test-components/shadcn/test-card"));
const TestCarousel = lazy(
  () => import("@/test-components/shadcn/test-carousel"),
);
const TestCheckbox = lazy(
  () => import("@/test-components/shadcn/test-checkbox"),
);
const TestCollapsible = lazy(
  () => import("@/test-components/shadcn/test-collapsible"),
);
const TestCombobox = lazy(
  () => import("@/test-components/shadcn/test-combobox"),
);
const TestCommand = lazy(() => import("@/test-components/shadcn/test-command"));
const TestContextMenu = lazy(
  () => import("@/test-components/shadcn/test-context-menu"),
);
const TestDialog = lazy(() => import("@/test-components/shadcn/test-dialog"));
const TestDrawer = lazy(() => import("@/test-components/shadcn/test-drawer"));
const TestDropdownMenu = lazy(
  () => import("@/test-components/shadcn/test-dropdown-menu"),
);
const TestHoverCard = lazy(
  () => import("@/test-components/shadcn/test-hover-card"),
);
const TestInput = lazy(() => import("@/test-components/shadcn/test-input"));
const TestLabel = lazy(() => import("@/test-components/shadcn/test-label"));
const TestPagination = lazy(
  () => import("@/test-components/shadcn/test-pagination"),
);
const TestPopover = lazy(() => import("@/test-components/shadcn/test-popover"));
const TestProgress = lazy(
  () => import("@/test-components/shadcn/test-progress"),
);
const TestRatioGroup = lazy(
  () => import("@/test-components/shadcn/test-ratio-group"),
);
const TestResizable = lazy(
  () => import("@/test-components/shadcn/test-resizable"),
);
const TestScrollArea = lazy(
  () => import("@/test-components/shadcn/test-scroll-area"),
);
const TestSelect = lazy(() => import("@/test-components/shadcn/test-select"));
const TestSeparator = lazy(
  () => import("@/test-components/shadcn/test-separator"),
);
const TestSheet = lazy(() => import("@/test-components/shadcn/test-sheet"));
const TestSkeleton = lazy(
  () => import("@/test-components/shadcn/test-skeleton"),
);
const TestSlider = lazy(() => import("@/test-components/shadcn/test-slider"));
const TestSonner = lazy(() => import("@/test-components/shadcn/test-sonner"));
const TestSwitch = lazy(() => import("@/test-components/shadcn/test-switch"));
const TestTable = lazy(() => import("@/test-components/shadcn/test-table"));
const TestTabs = lazy(() => import("@/test-components/shadcn/test-tabs"));
const TestTextarea = lazy(
  () => import("@/test-components/shadcn/test-textarea"),
);
const TestToggle = lazy(() => import("@/test-components/shadcn/test-toggle"));
const TestTooltip = lazy(() => import("@/test-components/shadcn/test-tooltip"));

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
    title: "Button",
    Element: TestButton,
    className: "flex-col",
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
    title: "HoverCard",
    Element: TestHoverCard,
    className: "justify-center",
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
    title: "Pagination",
    Element: TestPagination,
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
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-4 p-2 pb-96">
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

      {/* <Button
        onClick={toggleTheme}
        size="icon"
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full"
      >
        {theme === 1 ? <IconSun /> : <IconMoonStars />}
      </Button> */}
    </div>
  );
}

export default ShadCN;

export const getStaticProps: GetStaticProps = () => {
  if (process.env.NODE_ENV === "production") {
    return { notFound: true };
  }
  return { props: {} };
};
