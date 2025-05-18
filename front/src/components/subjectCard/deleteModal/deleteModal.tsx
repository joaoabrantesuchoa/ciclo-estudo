import React from "react";

interface DeleteModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ name, onConfirm, onCancel }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        minWidth: "260px",
        textAlign: "center",
      }}
    >
      <p>Deseja deletar o assunto "{name}"?</p>
      <button onClick={onConfirm} style={{ marginRight: 8, color: "red" }}>
        Deletar
      </button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
);

export default DeleteModal;