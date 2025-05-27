import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("NotFound page", () => {
  it("renders not found message and splat path", () => {
    render(
      <MemoryRouter initialEntries={["/some/unknown/path"]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /page not found/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/could not find/i)).toBeInTheDocument();
  });
});
