/*
  Warnings:

  - A unique constraint covering the columns `[stationAddressId]` on the table `juiceStation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "juiceStation" DROP CONSTRAINT "juiceStation_stationAddressId_fkey";

-- AlterTable
ALTER TABLE "juiceStation" ALTER COLUMN "stationAddressId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "juiceStation_stationAddressId_key" ON "juiceStation"("stationAddressId");

-- AddForeignKey
ALTER TABLE "juiceStation" ADD CONSTRAINT "juiceStation_stationAddressId_fkey" FOREIGN KEY ("stationAddressId") REFERENCES "stationAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
