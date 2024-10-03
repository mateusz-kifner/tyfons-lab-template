import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowsHorizontal,
  IconDots,
} from "@tabler/icons-react";

import { cn } from "@acme/ui";
import { type ButtonProps, buttonVariants } from "./button";
import { useId, useState } from "react";
import { usePagination } from "@mantine/hooks";

const PaginationRoot = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
PaginationRoot.displayName = "PaginationRoot";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <IconChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <IconChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <IconArrowsHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

interface PaginationProps {
  siblings?: number;
  initialPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  siblings = 2,
  initialPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const uuid = useId();
  const { range, active, setPage } = usePagination({
    total: totalPages,
    initialPage,
    onChange: onPageChange,
    siblings,
  });

  return (
    <nav className="flex items-center justify-center gap-px">
      <button
        type="button"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md",
          active === 1
            ? "text-stone-500"
            : "text-blue-600 hover:bg-black hover:bg-opacity-30 hover:text-blue-600",
        )}
        onClick={() => setPage(active - 1)}
        disabled={active === 1}
      >
        <IconChevronLeft />
        <span className="sr-only">Previous</span>
      </button>

      {range.map((page, index) => {
        if (page === "dots") {
          return (
            <IconDots
              key={`${uuid}_${index}`}
              className="text-stone-500 dark:text-stone-200"
              size={16}
            />
          );
        }

        return (
          <button
            type="button"
            key={`${uuid}_${index}`}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md font-medium text-base",
              active === page
                ? "bg-blue-500/50 text-white"
                : "text-stone-600 hover:bg-black hover:bg-opacity-30 hover:text-blue-600 dark:text-stone-300",
            )}
            onClick={() => setPage(page)}
            aria-current={active === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md",
          active === totalPages
            ? "text-stone-500"
            : "text-blue-600 hover:bg-black hover:bg-opacity-30 hover:text-blue-600",
        )}
        onClick={() => setPage(active + 1)}
        disabled={active === totalPages}
      >
        <span className="sr-only">Next</span>
        <IconChevronRight />
      </button>
    </nav>
  );
}
interface usePaginationDataProps {
  page: number;
  itemsPerPage: number;
}

function usePaginationState(initialState?: usePaginationDataProps) {
  const [page, setPage] = useState<number>(initialState?.page ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    initialState?.itemsPerPage ?? 10,
  );
  return { page, setPage, itemsPerPage, setItemsPerPage };
}

export {
  Pagination,
  PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  usePaginationState,
};
