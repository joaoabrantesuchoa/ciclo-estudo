import React, { useState, useEffect } from "react";

interface TimerModalProps {
  id?: string;
  name: string;
  time: number;
  totalTime: number;
  setActualTime: (newTime: number) => void;
  onClose: () => void;
}

const TimerModal: React.FC<TimerModalProps> = ({
  name,
  time,
  setActualTime,
  onClose,
}) => {
  const [remainingTime, setRemainingTime] = useState(time * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setActualTime(remainingTime / 60); 
    onClose();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h2>{name}</h2>
        <p>Tempo Restante:</p>
        <h1>{formatTime(remainingTime)}</h1>
        <button onClick={handleClose} style={{ marginTop: "1rem" }}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default TimerModal;
