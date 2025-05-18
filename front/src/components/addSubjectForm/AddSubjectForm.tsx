import React, { useState } from "react";

interface AddSubjectFormProps {
  onAdd: (name: string, time: number) => void;
}

const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && time) {
      onAdd(name, Number(time));
      setName("");
      setTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Adicionar Matéria</h2>
      <div>
        <label>Nome da Matéria</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da Matéria"
        />
      </div>
      <div>
        <label>Tempo do Ciclo (minutos)</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          placeholder="Tempo do Ciclo"
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddSubjectForm;