/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phoneNumber",
ADD COLUMN     "picture" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Songs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Songs" ADD CONSTRAINT "Songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
