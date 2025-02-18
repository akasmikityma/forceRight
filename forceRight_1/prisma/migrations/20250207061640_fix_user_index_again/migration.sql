-- CreateEnum
CREATE TYPE "DifficultyStatus" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" "DifficultyStatus" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "timeTakenMinutes" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
