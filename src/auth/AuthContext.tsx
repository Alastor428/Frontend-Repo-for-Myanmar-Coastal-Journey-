import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
  type AuthSession,
} from "./authStorage";

type AuthContextValue = {
  bootstrapped: boolean;
  isLoggedIn: boolean;
  loginWithSession: (session: AuthSession) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await loadAuthSession();
        if (!cancelled && session) {
          setIsLoggedIn(true);
        }
      } finally {
        if (!cancelled) {
          setBootstrapped(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loginWithSession = useCallback(async (session: AuthSession) => {
    await saveAuthSession(session);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await clearAuthSession();
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({
      bootstrapped,
      isLoggedIn,
      loginWithSession,
      logout,
    }),
    [bootstrapped, isLoggedIn, loginWithSession, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
