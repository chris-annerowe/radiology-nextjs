-- CreateTable
CREATE TABLE "configuration" (
    "configuration_id" SERIAL NOT NULL,
    "server_host" TEXT NOT NULL,
    "server_port" INTEGER NOT NULL,
    "sender_email" TEXT NOT NULL,
    "sender_password" TEXT NOT NULL,
    "receiver_email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" INTEGER NOT NULL,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("configuration_id")
);

-- AddForeignKey
ALTER TABLE "configuration" ADD CONSTRAINT "configuration_modified_by_fkey" FOREIGN KEY ("modified_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
