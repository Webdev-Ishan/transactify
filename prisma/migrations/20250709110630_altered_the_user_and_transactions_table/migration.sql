-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "razorpayID" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;
