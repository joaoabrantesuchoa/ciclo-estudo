import React from "react";

interface ProgressBarProps {
  progress: number;
}

const playBeep = () => {
  const base64Sound = "data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAA3wHyfQWS3EACYmxLgoBTWIDBgACBPwLBoABQzgEAGBgCIiwMASRMAAICB4yDxQxoACNMFrPyLQAEaYLWfkWA4B4yDxQxoACNMFrPyLQAEaYLWfkWA4B4yDxQxoACNMFrPyLQAEaYLWfkWA4B4yDxQxoACNMFrPyLQAEaYLWfkWA4B/5/4d1gAMAQAqghgANE1gIAAANCLQOjJh4QIMC5YUBoR4yDxQxoACNMFrPyLQA=";

  const audio = new Audio(base64Sound);
  audio.play() 
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  if (normalizedProgress === 100) {
    playBeep();
  }

  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        height: "10px",
        margin: "0.5rem 0",
      }}
    >
      <div
        style={{
          width: `${normalizedProgress}%`,
          backgroundColor: "#1a1a2e",
          height: "100%",
          transition: "width 0.3s ease", // Adiciona uma transição suave
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;