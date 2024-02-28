import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const initialState = {
  user: "",
  roles: [],
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (auth?.roles.includes(5150)) {
      setRole("Admin");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
