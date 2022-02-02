/*
  Warnings:

  - Made the column `created_at` on table `deliveries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL;
