import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const parseJwt = (token: string) => {
    try{
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
             window
            .atob(base64)
            .split('')
            .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
        return JSON.parse(jsonPayload);
    }
    catch{
        return null;
    }
}

export const useTokenExpiration = () => {
  const { token, setLogout } = useAuthStore();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (token) {
      const decodedToken = parseJwt(token);

      if (decodedToken && decodedToken.exp) {
        const expirationTimeInMs = decodedToken.exp * 1000;
        const currentTimeInMs = Date.now();
        const timeUntilExpiration = expirationTimeInMs - currentTimeInMs;

        if (timeUntilExpiration > 0) {
          timeoutId = setTimeout(() => {
            setLogout();
          }, timeUntilExpiration);
        } else {
          setLogout();
        }
      }
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [token, setLogout]);
};