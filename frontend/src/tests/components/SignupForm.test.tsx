import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import SignupForm from "@/components/auth/SignupForm";
import useSignup from "@/hooks/useSignup";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useSignup", () => ({
  default: vi.fn(),
}));

describe("SignupForm", () => {
  const mockSignup = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();

    (useSignup as Mock).mockReturnValue({
      signup: mockSignup,
    });
  });

  it("should render validation errors when empty fields submited", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const submitButton = screen.getByRole("button", { name: /signup/i });

    await user.click(submitButton);

    expect(await screen.findByRole("nameErrorField")).toBeInTheDocument();
    expect(await screen.findByRole("emailErrorField")).toBeInTheDocument();
    expect(await screen.findByRole("passwordErrorField")).toBeInTheDocument();

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("should call the login function when data is valid", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/confirm/i);
    const submitButton = screen.getByRole("button", { name: /signup/i });

    await user.type(nameInput, "JohnDoe123");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "StrongPass123!");
    await user.type(confirmPasswordInput, "StrongPass123!");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledTimes(1);
      expect(mockSignup).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "JohnDoe123",
          email: "test@example.com",
          password: "StrongPass123!",
        }),
      );
    });
  });
});
