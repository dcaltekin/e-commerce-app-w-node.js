import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };
  const logoutNoPush = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setToken("");
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, logout, logoutNoPush }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
