/*
  Warnings:

  - Added the required column `content` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tpoic` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "tpoic" TEXT NOT NULL;
