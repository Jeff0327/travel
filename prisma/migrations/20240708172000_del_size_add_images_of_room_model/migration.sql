/*
  Warnings:

  - You are about to drop the column `size` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "size",
ADD COLUMN     "images" TEXT[];
