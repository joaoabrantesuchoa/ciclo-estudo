import prisma from './prisma/prismaClient';

async function main() {
  console.log('Seeding database...');

  await prisma.subject.deleteMany();
  await prisma.studyCycle.deleteMany();

  const matematica = await prisma.subject.create({
    data: { name: 'Matemática', totalTime: 120, actualTime: 60 },
  });
  const fisica = await prisma.subject.create({
    data: { name: 'Física', totalTime: 90, actualTime: 30 },
  });
  const quimica = await prisma.subject.create({
    data: { name: 'Química', totalTime: 60, actualTime: 45 },
  });

  await prisma.studyCycle.create({
    data: {
      name: 'Ciclo de Estudos 1',
      totalTimeStudied: 0,
      subjects: {
        connect: [{ id: matematica.id }, { id: fisica.id }, { id: quimica.id }],
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
