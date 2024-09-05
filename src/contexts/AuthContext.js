import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [action, setAction] = useState(null);

  const authLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
  }

  const authLogout = (user) => {
    setIsLoggedIn(false);
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, authLogin, authLogout, action, setAction, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}