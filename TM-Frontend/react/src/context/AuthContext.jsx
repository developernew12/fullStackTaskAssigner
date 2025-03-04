import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
