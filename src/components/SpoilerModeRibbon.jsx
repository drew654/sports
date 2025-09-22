"use client";

import { useEffect, useState } from "react";

const SpoilerModeRibbon = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const spoilerModeEnabled = localStorage.getItem("spoilerMode") === "true";
    setVisible(spoilerModeEnabled);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background py-2 px-4 z-50 text-center">
      Spoiler Mode Enabled
    </div>
  );
};

export default SpoilerModeRibbon;
