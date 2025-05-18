import React, { useState } from "react";
import ProgressBar from "./progressBar/ProgressBar";
import TimerModal from "./timeModal/TimerModal";
import DeleteModal from "./deleteModal/deleteModal";

interface SubjectCardProps {
  name: string;
  id: string;
  progress: number;
  totalTime: number;
  actualTime: number;
  setActualTime: (newTime: number) => void;
  onDelete: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  id,
  progress,
  totalTime,
  actualTime,
  setActualTime,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className="card"
      style={{ width: "300px", textAlign: "center", position: "relative" }}
    >
      {/* X pequeno no topo direito */}
      <button
        onClick={handleDeleteClick}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "transparent",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          color: "#888",
        }}
        aria-label="Deletar assunto"
      >
        ×
      </button>
      <h3>{name}</h3>
      <ProgressBar progress={progress} />
      <p>{progress}% Completo</p>
      <button onClick={handlePlayClick}>▶</button>
      {isModalOpen && (
        <TimerModal
          id={id}
          name={name}
          time={actualTime}
          totalTime={totalTime}
          setActualTime={setActualTime}
          onClose={handleCloseModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          name={name}
          onConfirm={() => onDelete(id)}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default SubjectCard;
