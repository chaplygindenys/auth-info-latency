/*
  Warnings:

  - You are about to drop the column `hashToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "hashToken",
ADD COLUMN     "hashRefreshToken" TEXT;
