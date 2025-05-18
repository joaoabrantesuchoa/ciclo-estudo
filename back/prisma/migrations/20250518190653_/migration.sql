/*
  Warnings:

  - You are about to drop the `StudyCycle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudyCycleToSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudyCycle" DROP CONSTRAINT "StudyCycle_userId_fkey";

-- DropForeignKey
ALTER TABLE "_StudyCycleToSubject" DROP CONSTRAINT "_StudyCycleToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudyCycleToSubject" DROP CONSTRAINT "_StudyCycleToSubject_B_fkey";

-- DropTable
DROP TABLE "StudyCycle";

-- DropTable
DROP TABLE "_StudyCycleToSubject";

-- CreateTable
CREATE TABLE "_SubjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SubjectToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SubjectToUser_B_index" ON "_SubjectToUser"("B");

-- AddForeignKey
ALTER TABLE "_SubjectToUser" ADD CONSTRAINT "_SubjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToUser" ADD CONSTRAINT "_SubjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
