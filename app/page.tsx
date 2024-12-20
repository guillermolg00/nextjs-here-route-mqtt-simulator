"use client";
import { useState } from "react";
import HereConfigForm from "./components/here-config-form";
import HereMap from "./components/here-map";
import { AddressInput } from "./components/address-input";
import MqttConfigForm from "./components/mqtt-config-form";

// const HereMap = dynamic(() => import('./components/hereMap'), { ssr: false } );

export default function Page() {
  const [isHereValid, setIsHereValid] = useState(false);
  const [isMqttValid, setIsMqttValid] = useState(false);

  const handleHereValidation = (isValid: boolean) => {
    setIsHereValid(isValid);
  };
  const handleMqttValidation = (isValid: boolean) => {
    setIsMqttValid(isValid);
  }

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Simulator
      </h1>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">HERE Map</h1>
        <HereConfigForm onValidate={handleHereValidation} />
        {isHereValid && (
          <>
            <MqttConfigForm onValidate={handleMqttValidation} />
            <HereMap />
          </>
        )}
      </div>
    </section>
  );
}
