/*
  Warnings:

  - The primary key for the `Cattle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_cattle` on the `Cattle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cattle" DROP CONSTRAINT "Cattle_pkey",
DROP COLUMN "id_cattle",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "id_iron" DROP NOT NULL,
ADD CONSTRAINT "Cattle_pkey" PRIMARY KEY ("id");
