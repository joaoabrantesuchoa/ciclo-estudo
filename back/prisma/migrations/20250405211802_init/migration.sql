/*
  Warnings:

  - You are about to drop the column `color` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "color",
DROP COLUMN "description",
ADD COLUMN     "actualTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTime" INTEGER NOT NULL DEFAULT 0;
