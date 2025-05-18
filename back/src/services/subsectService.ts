import prisma from "../prisma/prismaClient";

class SubjectService {
  // Obter todos os Subjects
  async getAllSubjects() {
    return await prisma.subject.findMany();
  }

  // Criar um novo Subject
  async createSubject(name: string, totalTime: number, actualTime: number) {
    return await prisma.subject.create({
      data: {
        name,
        totalTime,
        actualTime,
      },
    });
  }

  // Atualizar um Subject pelo ID (id agora é string)
  async updateSubject(id: string, name: string, totalTime: number, actualTime: number) {
    return await prisma.subject.update({
      where: { id },
      data: {
        name,
        totalTime,
        actualTime,
      },
    });
  }

  // Excluir um Subject pelo ID (id agora é string)
  async deleteSubject(id: string) {
    return await prisma.subject.delete({
      where: { id },
    });
  }
}

export default new SubjectService();