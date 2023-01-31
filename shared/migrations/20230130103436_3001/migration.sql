/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT,
    "studentId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_studentId_idx" ON "user"("studentId");

-- CreateIndex
CREATE INDEX "user_teacherId_idx" ON "user"("teacherId");
