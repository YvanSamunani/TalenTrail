import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthStatus = () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(isAuthenticated);
      };
    const login = () => {
        setIsAuthenticated(true);
      };
      
    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
      };
    useEffect(() => {
        const authFlag = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authFlag === 'true');
      }, []);

      return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
};
