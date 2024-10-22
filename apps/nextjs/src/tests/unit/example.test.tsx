import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import TestBadge from "../../test-components/shadcn/test-badge";

test("Page", () => {
  render(<TestBadge />);
  expect(screen.getByText("primary")).toBeDefined();
  expect(screen.getByText("secondary")).toBeDefined();
  expect(screen.getByText("outline")).toBeDefined();
  expect(screen.getByText("destructive")).toBeDefined();
});
