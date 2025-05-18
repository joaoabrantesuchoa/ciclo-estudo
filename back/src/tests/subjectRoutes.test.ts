import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import express from "express";
import request from "supertest";
import prisma from "../prisma/prismaClient";
import subjectRoutes from "../routes/subjectRoutes";

const app = express();
app.use(express.json());
app.use("/subjects", subjectRoutes);

beforeAll(async () => {
  await prisma.subject.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Subject Routes", () => {
  it("Deve criar um novo Subject", async () => {
    const response = await request(app).post("/subjects").send({
      name: "Matemática",
      totalTime: 120,
      actualTime: 60,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Matemática");
  });

  it("Deve obter todos os Subjects", async () => {
    const response = await request(app).get("/subjects");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Deve atualizar um Subject pelo ID", async () => {
    // Criar um Subject para atualizar
    const subject = await prisma.subject.create({
      data: {
        name: "Física",
        totalTime: 90,
        actualTime: 30,
      },
    });

    const response = await request(app).put(`/subjects/${subject.id}`).send({
      name: "Física Avançada",
      totalTime: 100,
      actualTime: 50,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Física Avançada");
    expect(response.body.totalTime).toBe(100);
    expect(response.body.actualTime).toBe(50);
  });

  it("Deve excluir um Subject pelo ID", async () => {
    // Criar um Subject para excluir
    const subject = await prisma.subject.create({
      data: {
        name: "Química",
        totalTime: 60,
        actualTime: 45,
      },
    });

    const response = await request(app).delete(`/subjects/${subject.id}`);

    expect(response.status).toBe(204);

    // Verificar se o Subject foi realmente excluído
    const deletedSubject = await prisma.subject.findUnique({
      where: { id: subject.id },
    });
    expect(deletedSubject).toBeNull();
  });
});