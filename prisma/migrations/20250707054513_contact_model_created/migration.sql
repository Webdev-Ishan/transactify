-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_senderId_key" ON "Contact"("senderId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
