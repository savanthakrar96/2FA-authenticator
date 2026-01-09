import { createContext, useContext, useEffect, useState } from "react";
import { authStatus } from "../service/authApi";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 VERIFY BACKEND SESSION ON LOAD
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authStatus(); // calls /api/auth/status
        setUser(data.user);
        setIsLoggedIn(true);

        // optional cache
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        // backend says not logged in → 401
        setUser(null);
        setIsLoggedIn(false);
        sessionStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("user");
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
