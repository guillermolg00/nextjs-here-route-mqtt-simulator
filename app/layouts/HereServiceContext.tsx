'use client'
import { createContext, useContext, useRef } from "react";
import { HereService, HereServiceConfig } from "../services/here/here.service";

export const HereServiceContext = createContext<HereService | null>(null);

export const HereServiceProvider = ({
  children,
  config
}: {
  children: React.ReactNode;
  config: HereServiceConfig;
}) => {
  const service = useRef(HereService.initialize({
    ...config
  }))

  return (
    <HereServiceContext.Provider value={service.current}>
      {children}
    </HereServiceContext.Provider>
  );
};

export const useHereService = () => {
  const service = useContext(HereServiceContext);

  if (!service) {
    throw new Error("useHereService must be used within a HereServiceProvider");
  }

  return service;
}
