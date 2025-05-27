import { render, screen, fireEvent } from "@testing-library/react";
import CheckOutForm from "./CheckOutForm";

describe("CheckOutForm", () => {
  it("renders all input fields and button", () => {
    render(<CheckOutForm />);
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /place order/i })
    ).toBeInTheDocument();
  });

  it("calls handleSubmit and logs data on submit", () => {
    // Mock console.log
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<CheckOutForm />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });

    fireEvent.click(screen.getByRole("button", { name: /place order/i }));

    expect(logSpy).toHaveBeenCalledWith("Order submitted:", {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      address: "123 Main St",
    });

    logSpy.mockRestore();
  });
});
