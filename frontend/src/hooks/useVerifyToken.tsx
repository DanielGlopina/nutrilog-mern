import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useTokenExpiration } from "./useTokenExpiration";

const useVerifyToken = () => {
  const { token, setLogout } = useAuthStore();
  const { setIsChecking } = useAuthStore();
  useTokenExpiration();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsChecking(false);
        return;
      }

      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            "x-auth-token": token,
          },
        });

        useAuthStore.setState({ user: res.data, isAuthenticated: true });
      } catch {
        console.error("Your session has expired.");
        setLogout();
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [token, setLogout]);
};

export default useVerifyToken;
