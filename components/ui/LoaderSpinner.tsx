import React from "react";

interface LoaderSpinnerProps {
  size?: number;
}

export default function LoaderSpinner({ size = 20 }) {
  return (
    <div
      className="inline-block animate-spin"
      style={{
        width: size,
        height: size,
        border: "3px solid rgba(255,255,255,0.4)",
        borderTopColor: "#ffffff",
        borderRadius: "50%",
      }}
    />
  );
}

