/*
  Warnings:

  - Made the column `observations` on table `Cattle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Ground` required. This step will fail if there are existing NULL values in that column.
  - Made the column `length` on table `Ground` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Ground` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `Ground` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cattle" ALTER COLUMN "observations" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ground" ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "length" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "notes" SET NOT NULL;
