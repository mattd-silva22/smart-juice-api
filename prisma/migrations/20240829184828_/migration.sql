/*
  Warnings:

  - You are about to drop the column `fisrtName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fisrtName",
ADD COLUMN     "firstName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");
