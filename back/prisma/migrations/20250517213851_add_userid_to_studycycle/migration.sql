-- Adiciona a coluna como opcional
ALTER TABLE "StudyCycle" ADD COLUMN "userId" TEXT;

-- Cria a tabela User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Cria índice único para email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Cria um usuário temporário
INSERT INTO "User" (id, email, password, "createdAt") VALUES ('temp-user-id', 'temp@temp.com', 'temppassword', NOW());

-- Atualiza todos os StudyCycles existentes para usar o usuário temporário
UPDATE "StudyCycle" SET "userId" = 'temp-user-id' WHERE "userId" IS NULL;

-- Agora torna a coluna obrigatória e única
ALTER TABLE "StudyCycle" ALTER COLUMN "userId" SET NOT NULL;
CREATE UNIQUE INDEX "StudyCycle_userId_key" ON "StudyCycle"("userId");

-- Adiciona a foreign key
ALTER TABLE "StudyCycle" ADD CONSTRAINT "StudyCycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;