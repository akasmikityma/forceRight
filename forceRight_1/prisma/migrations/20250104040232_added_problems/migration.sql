/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "Solstatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SOLVED');

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "problemLink" TEXT NOT NULL,
    "initialThoughts" TEXT NOT NULL,
    "logic" TEXT NOT NULL,
    "logicGap" TEXT,
    "implementationGap" TEXT,
    "solution" TEXT NOT NULL,
    "status" "Solstatus" NOT NULL DEFAULT 'PENDING',
    "rating" "Rating" NOT NULL DEFAULT 'ONE',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_problemLink_key" ON "Problem"("problemLink");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
