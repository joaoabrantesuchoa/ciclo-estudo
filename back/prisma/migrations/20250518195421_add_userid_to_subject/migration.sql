/*
  Warnings:

  - You are about to drop the `_SubjectToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SubjectToUser" DROP CONSTRAINT "_SubjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToUser" DROP CONSTRAINT "_SubjectToUser_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SubjectToUser";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
