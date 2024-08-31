/*
  Warnings:

  - You are about to drop the column `productsId` on the `ingredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_productsId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "productsId";

-- CreateTable
CREATE TABLE "productsRecipes" (
    "productId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "productsRecipes_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "productsRecipes" ADD CONSTRAINT "productsRecipes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsRecipes" ADD CONSTRAINT "productsRecipes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
