"use client";

import { useState } from "react";

type Props = {
  roomId: string;
};

export default function ShareButton({ roomId }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const shareUrl = `${window.location.origin}/editor?roomId=${roomId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {copied ? "Copied!" : "Share Room"}
    </button>
  );
}

