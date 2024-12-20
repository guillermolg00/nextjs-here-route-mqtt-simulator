'use client'
import { createContext, useContext, useRef, useState } from 'react';
import { HereService, HereServiceConfig } from '../services/here/here.service';

type HereServiceContextType = {
  service: HereService | null;
  updateConfig: (config: HereServiceConfig) => void;
};

export const HereServiceContext = createContext<HereServiceContextType | null>(null);

export const HereServiceProvider = ({
  children,
  initialConfig,
}: {
  children: React.ReactNode;
  initialConfig: HereServiceConfig;
}) => {
  const [config, setConfig] = useState(initialConfig);
  const service = useRef(HereService.initialize(config));

  const updateConfig = (newConfig: HereServiceConfig) => {
    setConfig(newConfig);
    service.current = HereService.initialize(newConfig);
  };

  return (
    <HereServiceContext.Provider value={{ service: service.current, updateConfig }}>
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
