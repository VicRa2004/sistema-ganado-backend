/*
  Warnings:

  - The primary key for the `Ground` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_ground` on the `Ground` table. All the data in the column will be lost.
  - The primary key for the `Iron` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_iron` on the `Iron` table. All the data in the column will be lost.
  - The primary key for the `Race` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_race` on the `Race` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `User` table. All the data in the column will be lost.
  - Made the column `description` on table `Race` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cattle" DROP CONSTRAINT "Cattle_id_ground_fkey";

-- DropForeignKey
ALTER TABLE "Cattle" DROP CONSTRAINT "Cattle_id_iron_fkey";

-- DropForeignKey
ALTER TABLE "Cattle" DROP CONSTRAINT "Cattle_id_race_fkey";

-- DropForeignKey
ALTER TABLE "Cattle" DROP CONSTRAINT "Cattle_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Ground" DROP CONSTRAINT "Ground_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Iron" DROP CONSTRAINT "Iron_id_user_fkey";

-- AlterTable
ALTER TABLE "Ground" DROP CONSTRAINT "Ground_pkey",
DROP COLUMN "id_ground",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Ground_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Iron" DROP CONSTRAINT "Iron_pkey",
DROP COLUMN "id_iron",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Iron_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Race" DROP CONSTRAINT "Race_pkey",
DROP COLUMN "id_race",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Race_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id_user",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Iron" ADD CONSTRAINT "Iron_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ground" ADD CONSTRAINT "Ground_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_iron_fkey" FOREIGN KEY ("id_iron") REFERENCES "Iron"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_race_fkey" FOREIGN KEY ("id_race") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_ground_fkey" FOREIGN KEY ("id_ground") REFERENCES "Ground"("id") ON DELETE CASCADE ON UPDATE CASCADE;
