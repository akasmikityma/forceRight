/*
  Warnings:

  - The `logic` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "implementations" TEXT[],
DROP COLUMN "logic",
ADD COLUMN     "logic" TEXT[];
