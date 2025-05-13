// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create Context
const AuthContext = createContext();

// 2. Create custom hook
export const useAuth = () => useContext(AuthContext);

// 3. Create Provider component
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthenticatedUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/me", {
        withCredentials: true,
      });
      setAuthenticated(true);
      setRole(res.data.role);
      setUser(res.data);
    } catch {
      setAuthenticated(false);
      setRole(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        role,
        user,
        loading,
        fetchAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
