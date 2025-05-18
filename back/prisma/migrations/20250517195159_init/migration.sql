/*
  Warnings:

  - The primary key for the `StudyCycle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_StudyCycleToSubject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_StudyCycleToSubject" DROP CONSTRAINT "_StudyCycleToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudyCycleToSubject" DROP CONSTRAINT "_StudyCycleToSubject_B_fkey";

-- AlterTable
ALTER TABLE "StudyCycle" DROP CONSTRAINT "StudyCycle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudyCycle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StudyCycle_id_seq";

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subject_id_seq";

-- AlterTable
ALTER TABLE "_StudyCycleToSubject" DROP CONSTRAINT "_StudyCycleToSubject_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_StudyCycleToSubject_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_StudyCycleToSubject" ADD CONSTRAINT "_StudyCycleToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "StudyCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyCycleToSubject" ADD CONSTRAINT "_StudyCycleToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
