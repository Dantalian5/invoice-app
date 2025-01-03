import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type LoginFn = (email: string, password: string) => Promise<boolean>;
interface AuthContextType {
  login: LoginFn;
  isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token"),
  );

  const login: LoginFn = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        },
      );
      if (response.status !== 200) {
        return false;
      }
      setToken(response.data.data.token);
      return true;
    } catch (err) {
      return false;
    }
  };
  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
type AuthContextProps = ReturnType<typeof useAuth>;
export { AuthProvider, useAuth, type AuthContextProps };
