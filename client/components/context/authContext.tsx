import { ReactNode, createContext, useContext, useState } from "react";

interface authContextType {
  authString: string | undefined;
  setAuthString: (authString: string | undefined) => void;
}

const authContext = createContext<authContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useauth must be used within a authProvider");
  }
  return context;
}

interface authProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: authProviderProps) => {
  const [authString, setAuthString] = useState<string | undefined>(undefined);

  const authContextValue = {
    authString,
    setAuthString,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
};
