-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#4CAF50',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyCycle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalTimeStudied" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudyCycleToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StudyCycleToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudyCycleToSubject_B_index" ON "_StudyCycleToSubject"("B");

-- AddForeignKey
ALTER TABLE "_StudyCycleToSubject" ADD CONSTRAINT "_StudyCycleToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "StudyCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyCycleToSubject" ADD CONSTRAINT "_StudyCycleToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
