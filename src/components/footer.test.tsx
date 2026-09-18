import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { Footer } from "@/components/footer";

afterEach(cleanup);

describe("Footer", () => {
  it("links to the real social destinations", () => {
    const { container } = render(<Footer />);

    const hrefs = Array.from(container.querySelectorAll("a")).map((link) =>
      link.getAttribute("href"),
    );

    expect(hrefs).toContain("https://github.com/kleva-j");
    expect(hrefs).toContain(
      "https://www.linkedin.com/in/michael-obasi-808806140/",
    );
  });

  it("surfaces the Writing and About links", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: "Writing" }).getAttribute("href"),
    ).toBe("/writing");
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("href"),
    ).toBe("/about");
  });
});
