import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import useLogin from "@/hooks/useLogin";
import { api } from "@/api/api";
import { useAuthStore } from "@/store/useAuthStore";

const navigate = vi.fn();
vi.mock("react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("useLogin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    navigate.mockReset();
    useAuthStore.setState({ token: null, isAuthenticated: false });
  });

  it("stores the token, notifies and redirects after a successful login", async () => {
    vi.spyOn(api, "post").mockResolvedValue({ data: { token: "jwt-token" } });
    const { result } = renderHook(() => useLogin());
    await act(() => result.current.login({ email: "user@example.com", password: "secret" }));
    expect(api.post).toHaveBeenCalledWith("/auth", { email: "user@example.com", password: "secret" });
    expect(useAuthStore.getState()).toMatchObject({ token: "jwt-token", isAuthenticated: true });
    expect(toast.success).toHaveBeenCalledWith("Success", { description: "You have logged in!" });
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("shows a fallback error and keeps the user logged out when login fails", async () => {
    vi.spyOn(api, "post").mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useLogin());
    await act(() => result.current.login({ email: "user@example.com", password: "wrong" }));
    expect(toast.error).toHaveBeenCalledWith("Error!", { description: "Unexpected login error" });
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(navigate).not.toHaveBeenCalled();
  });
});
