/*
  Warnings:

  - You are about to drop the column `usersAddressId` on the `juiceStation` table. All the data in the column will be lost.
  - The `status` column on the `juiceStation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `ordersId` on the `products` table. All the data in the column will be lost.
  - Added the required column `stationAddressId` to the `juiceStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `juiceStation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "juiceStation" DROP CONSTRAINT "juiceStation_usersAddressId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_ordersId_fkey";

-- AlterTable
ALTER TABLE "juiceStation" DROP COLUMN "usersAddressId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stationAddressId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StationStatus" NOT NULL DEFAULT 'CLOSED';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "ordersId";

-- CreateTable
CREATE TABLE "productsOrders" (
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "productsOrders_pkey" PRIMARY KEY ("productId","orderId")
);

-- AddForeignKey
ALTER TABLE "productsOrders" ADD CONSTRAINT "productsOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOrders" ADD CONSTRAINT "productsOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juiceStation" ADD CONSTRAINT "juiceStation_stationAddressId_fkey" FOREIGN KEY ("stationAddressId") REFERENCES "stationAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
