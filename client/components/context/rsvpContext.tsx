import { ReactNode, createContext, useContext, useState } from "react";

interface RsvpContextType {
  rsvpSuccess: boolean;
  setRsvpSuccessTrue: () => void;
}

const rsvpContext = createContext<RsvpContextType | undefined>(undefined);

export function useRSVP() {
  const context = useContext(rsvpContext);
  if (context === undefined) {
    throw new Error("useRSVP must be used within a RsvpProvider");
  }
  return context;
}

interface RsvpProviderProps {
  children: ReactNode;
}

export const RsvpContextProvider = ({ children }: RsvpProviderProps) => {
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  function setRsvpSuccessTrue() {
    setRsvpSuccess(true);
  }

  const RSVPContextValue = {
    rsvpSuccess,
    setRsvpSuccessTrue,
  };

  return (
    <rsvpContext.Provider value={RSVPContextValue}>
      {children}
    </rsvpContext.Provider>
  );
};
