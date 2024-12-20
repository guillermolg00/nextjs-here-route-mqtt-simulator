"use client";

import { useState } from "react";
import { useMqttService } from "../layouts/MqttServiceContext";

interface MqttConfigFormProps {
  onValidate: (isValid: boolean) => void;
}

interface MqttConfig {
  host: string;
  username: string;
  password: string;
  topic: string;
}

const MqttConfigForm: React.FC<MqttConfigFormProps> = ({ onValidate }) => {
  const mqttService = useMqttService();
  if (!mqttService) return;

  const [isValid, setIsValid] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const host = e.currentTarget["host"].value;
    const username = e.currentTarget["username"].value;
    const password = e.currentTarget["password"].value;
    const topic = e.currentTarget["topic"].value;

    const isConfigValid = await mqttService.validateConfig({
      host,
      username,
      password,
      topic,
    });

    if (isConfigValid) {
      setIsValid(true);
      onValidate(true);
      setIsEditing(false);
      mqttService.connect({ host, username, password, topic });
    } else {
      alert("Invalid MQTT Configuration");
      setIsValid(false);
      onValidate(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
    setIsValid(false);
    onValidate(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mqtt connection params</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Host:</label>
          <input
            name="host"
            type="text"
            className="w-full border px-4 py-2 rounded-sm"
            placeholder="e.g., broker.hivemq.com"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username:</label>
          <input
            name="username"
            type="text"
            className="w-full border px-4 py-2 rounded-sm"
            placeholder="e.g., test-user"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            name="password"
            type={isEditing ? "text" : "password"}
            className="w-full border px-4 py-2 rounded-sm"
            placeholder="Your password"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Topic:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-sm"
            name="topic"
            placeholder="e.g., test/topic"
            required
            disabled={!isEditing}
          />
        </div>

        {isEditing ? (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors"
          >
            Validate MQTT Config
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-sm cursor-pointer"
          >
            Edit Config
          </button>
        )}

        {isValid && (
          <p className="text-green-500 mt-2">Configuration is valid!</p>
        )}
      </form>
    </div>
  );
};

export default MqttConfigForm;
