import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, type Mock } from "vitest";
import LoginForm from "@/components/auth/LoginForm";
import useLogin from "@/hooks/useLogin";

vi.mock("@/hooks/useLogin", () => ({
  default: vi.fn(),
}));

describe("LoginForm", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it("should render fields and form", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should render validation errors when empty fields submited", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(await screen.findByRole("emailErrorField")).toBeInTheDocument();
    expect(await screen.findByRole("passwordErrorField")).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("should call the login function when data is valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "ValidPassword123!");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "ValidPassword123!",
      });
    });
  });
});
