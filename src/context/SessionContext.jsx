import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../service/authApi";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ LOGOUT MUST ALWAYS SUCCEED
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // ignore backend errors
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <SessionContext.Provider
      value={{ user, isLoggedIn, loading, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
