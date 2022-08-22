-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "hashPsw" TEXT NOT NULL,
    "hashRefreshToken" TEXT,
    "id_type" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
