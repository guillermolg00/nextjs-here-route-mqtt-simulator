'use client'
import { MqttConnectionParams } from 'app/services/mqtt/mqtt.dto';
import { MqttService } from 'app/services/mqtt/mqtt.service';
import { createContext, useContext, useRef } from 'react';

interface MqttContextType {
  mqttService: MqttService | null;
  connect: (params: MqttConnectionParams) => void;
  disconnect: () => void;
  validateConfig: (params: MqttConnectionParams) => Promise<boolean>;
}

const MqttContext = createContext<MqttContextType | null>(null);

export const MqttProvider = ({ children }: { children: React.ReactNode }) => {
  const mqttServiceRef = useRef(new MqttService());

  const connect = (params: MqttConnectionParams) => {
    mqttServiceRef.current.connect(params);
  };

  const disconnect = () => {
    mqttServiceRef.current.disconnect();
  };

  const validateConfig = async (params: MqttConnectionParams) => {
    const validate = await mqttServiceRef.current.validateConfig(params);
    console.log(validate)
    return validate;
  }

  return (
    <MqttContext.Provider
      value={{ mqttService: mqttServiceRef.current, connect, disconnect, validateConfig }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttService = () => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqttService must be used within a MqttProvider');
  }
  return context;
};