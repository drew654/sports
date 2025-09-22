"use client";
import { LifebuoyIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [spoilerMode, setSpoilerMode] = useState(false);

  useEffect(() => {
    const storedSpoilerMode = localStorage.getItem("spoilerMode");
    setSpoilerMode(storedSpoilerMode === "true");
  }, []);

  const handleSpoilerModeToggle = () => {
    const newSpoilerMode = !spoilerMode;
    setSpoilerMode(newSpoilerMode);
    localStorage.setItem("spoilerMode", newSpoilerMode.toString());
    window.location.reload();
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
