"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GetMe, SignIn, SignUp, type AuthUser } from "@/handle/Login";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (name: string, email: string, senha: string) => Promise<void>;
  signOut: () => void;
  me: () => Promise<void>;
  verifyAdmin: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "access_token";

export const getToken = () => Cookies.get(TOKEN_KEY);
export const removeToken = () => Cookies.remove(TOKEN_KEY);
const saveToken = (t: string) =>
  Cookies.set(TOKEN_KEY, t, {
    expires: 1,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async (t: string) => {
    const u = await GetMe(t);
    if (!u?.id || !u.name || !u.email || !u.role) {
      setUser(null);
      throw new Error("Invalid user response");
    }
    setUser(u);
  }, []);

  const startSession = useCallback(
    async (t: string | undefined) => {
      if (!t) throw new Error("Response did not include a token");
      saveToken(t);
      setToken(t);
      await loadUser(t);
    },
    [loadUser],
  );

  const signIn = useCallback(
    async (email: string, senha: string) => {
      const data = await SignIn({ email, senha });
      await startSession(data.token);
    },
    [startSession],
  );

  const signUp = useCallback(
    async (name: string, email: string, senha: string) => {
      const data = await SignUp({ name, email, senha });
      await startSession(data.token);
    },
    [startSession],
  );

  const signOut = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, []);

  const me = useCallback(async () => {
    const t = getToken();
    if (!t) {
      signOut();
      return;
    }
    try {
      await loadUser(t);
    } catch {
      signOut();
    }
  }, [loadUser, signOut]);

  const verifyAdmin = useCallback(async () => {
    const t = getToken();
    if (!t) {
      router.replace("/login");
      return false;
    }

    try {
      const u = await GetMe(t);
      if (u.role !== "Admin") {
        router.replace("/");
        return false;
      }
      setUser(u);
      return true;
    } catch {
      signOut();
      router.replace("/login");
      return false;
    }
  }, [router, signOut]);

  useEffect(() => {
    const stored = getToken();
    if (!stored) {
      setLoading(false);
      return;
    }
    setToken(stored);
    loadUser(stored)
      .catch(() => signOut())
      .finally(() => setLoading(false));
  }, [loadUser, signOut]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: user !== null,
      signIn,
      signUp,
      signOut,
      me,
      verifyAdmin,
    }),
    [user, token, loading, signIn, signUp, signOut, me, verifyAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth precisa estar dentro de um <AuthProvider>");
  return context;
}
