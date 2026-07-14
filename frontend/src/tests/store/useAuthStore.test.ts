import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "@/store/useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false, isChecking: true });
  });

  it("authenticates when a token is stored", () => {
    useAuthStore.getState().setToken("token-123");
    expect(useAuthStore.getState()).toMatchObject({ token: "token-123", isAuthenticated: true });
  });

  it("clears session data on logout", () => {
    useAuthStore.setState({
      user: { name: "John", email: "john@example.com", avatar: "avatar.png" },
      token: "token-123",
      isAuthenticated: true,
    });
    useAuthStore.getState().setLogout();
    expect(useAuthStore.getState()).toMatchObject({ user: null, token: null, isAuthenticated: false });
  });

  it("updates the initial session-checking flag", () => {
    useAuthStore.getState().setIsChecking(false);
    expect(useAuthStore.getState().isChecking).toBe(false);
  });
});
