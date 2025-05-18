import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/header/Header";
import AddSubjectForm from "../components/addSubjectForm/AddSubjectForm";
import SubjectCard from "../components/subjectCard/SubjectCard";
import api, { Subject } from "../api";

const Home: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    const data = await api.get();
    setSubjects(data);
    console.log({ data });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDeleteSubject = useCallback(async (id: string) => {
    try {
      await api.delete(id);
      await fetchSubjects();
    } catch (error) {
      console.error("Erro ao deletar o assunto:", error);
      alert("Erro ao deletar o assunto.");
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [handleDeleteSubject]);

  const handleAddSubject = (name: string, time: number) => {
    setSubjects([...subjects, { name, totalTime: time, actualTime: time }]);

    api.post({ name, totalTime: time, actualTime: time }).then((data) => {
      console.log({ data });
    });
  };

  const updateActualTime = (
    id: string,
    name: string,
    totalTime: number,
    newTime: number
  ) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.name === name ? { ...subject, actualTime: newTime } : subject
      )
    );

    api
      .put(
        {
          name,
          totalTime: totalTime,
          actualTime: newTime,
        },
        id
      )
      .then((data) => {
        console.log({ data });
      });
  };

  console.log({ subjects });

  return (
    <div>
      <Header />
      <div className="container">
        <AddSubjectForm onAdd={handleAddSubject} />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {subjects.map((subject, index) => (
            <SubjectCard
              key={index}
              id={subject.id!}
              name={subject.name}
              progress={
                Math.round(
                  ((subject.totalTime - subject.actualTime) /
                    subject.totalTime) *
                    100 *
                    100
                ) / 100
              }
              totalTime={subject.totalTime}
              actualTime={subject.actualTime}
              setActualTime={(newTime) =>
                updateActualTime(
                  subject.id!,
                  subject.name,
                  subject.totalTime,
                  newTime
                )
              }
              onDelete={() => handleDeleteSubject(subject.id!)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
