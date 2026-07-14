import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import useSignup from "@/hooks/useSignup";
import { api } from "@/api/api";
import { useAuthStore } from "@/store/useAuthStore";

const navigate = vi.fn();
vi.mock("react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const validData = { name: "John Doe", email: "john@example.com", password: "StrongPass1!", confirmPassword: "StrongPass1!" };

describe("useSignup", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    navigate.mockReset();
    useAuthStore.setState({ token: null, isAuthenticated: false });
  });

  it("registers, stores the token and redirects", async () => {
    vi.spyOn(api, "post").mockResolvedValue({ data: { token: "jwt-token" } });
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup(validData));
    expect(api.post).toHaveBeenCalledWith("/users", validData);
    expect(useAuthStore.getState().token).toBe("jwt-token");
    expect(toast.success).toHaveBeenCalledWith("Success", { description: "You have registered new account!" });
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("does not call the API when passwords differ", async () => {
    const postSpy = vi.spyOn(api, "post");
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup({ ...validData, confirmPassword: "Different1!" }));
    expect(postSpy).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Error", { description: "Passwords should match" });
  });

  it("shows a fallback error when registration fails", async () => {
    vi.spyOn(api, "post").mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup(validData));
    expect(toast.error).toHaveBeenCalledWith("Error!", { description: "Unexpected signup error" });
    expect(navigate).not.toHaveBeenCalled();
  });
});
