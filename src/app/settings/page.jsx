"use client";
import { LifebuoyIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const SettingsPage = () => {
  const [spoilerMode, setSpoilerMode] = useState(
    localStorage.getItem("spoilerMode") === "true"
  );

  const handleSpoilerModeToggle = () => {
    setSpoilerMode(!spoilerMode);
    if (spoilerMode) {
      localStorage.removeItem("spoilerMode");
    } else {
      localStorage.setItem("spoilerMode", "true");
    }
  };

  return (
    <div className="p-4 select-none">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div
        className="flex items-center space-x-2 my-4 px-4"
        onClick={handleSpoilerModeToggle}
      >
        <LifebuoyIcon
          className={`w-8 h-8 ${spoilerMode ? "text-green-500" : ""}`}
        />
        <h2 className="text-xl font-bold">Spoiler Mode</h2>
      </div>
    </div>
  );
};

export default SettingsPage;
