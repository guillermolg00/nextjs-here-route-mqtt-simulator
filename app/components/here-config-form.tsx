"use client";

import { useHereService } from "app/layouts/HereServiceContext";
import { useState } from "react";

const HereConfigForm: React.FC<{ onValidate: (isValid: boolean) => void }> = ({
  onValidate,
}) => {
  const { updateConfig } = useHereService();
  const [isValid, setIsValid] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const validateApiKey = async (key: string): Promise<boolean> => {
    try {
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=Test&apiKey=${key}`;
      const response = await fetch(url);

      return response.status === 200;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Invalid API Key");
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = e.currentTarget["apiKey"].value;
    const isValidKey = await validateApiKey(apiKey);
    if (isValidKey) {
      updateConfig({ apiKey });
      setIsValid(true);
      onValidate(true);
      setIsEditing(false);
      console.log("API Key is valid");
    } else {
      alert("Invalid HERE API Key");
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
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">HERE API Key:</label>
        <input
          name="apiKey"
          type={isEditing ? "text" : "password"}
          className="w-full border px-4 py-2 rounded-sm"
          required
        />
      </div>
      {isEditing ? (
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Validate HERE API Key
        </button>
      ) : (
        <button
          type="button"
          onClick={handleEditClick}
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-sm cursor-pointer"
        >
          Edit API Key
        </button>
      )}
      {isValid && <p className="text-white mt-2">API Key Validated!</p>}
    </form>
  );
};

export default HereConfigForm;
