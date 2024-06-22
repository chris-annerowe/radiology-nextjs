-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "description" VARCHAR(40),
ADD COLUMN     "dob" TIMESTAMP(6),
ADD COLUMN     "firstName" VARCHAR(40),
ADD COLUMN     "lastName" VARCHAR(40),
ADD COLUMN     "modality" VARCHAR(20),
ADD COLUMN     "tel" VARCHAR(10);

-- CreateTable
CREATE TABLE "order_study" (
    "order_study_id" BIGSERIAL NOT NULL,
    "order_number" TEXT NOT NULL,
    "study_id" BIGINT NOT NULL,

    CONSTRAINT "order_study_pkey" PRIMARY KEY ("order_study_id")
);

-- CreateTable
CREATE TABLE "pos_insurance" (
    "insurance_id" VARCHAR(5) NOT NULL,
    "insurance_name" VARCHAR(100) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "last_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "in_use" INTEGER NOT NULL DEFAULT 0,
    "ins_abbreviation" VARCHAR(10),
    "bin_nos" VARCHAR(100),
    "bin_codes" VARCHAR(100),

    CONSTRAINT "pos_insurance_pkey" PRIMARY KEY ("insurance_id")
);

-- CreateTable
CREATE TABLE "pos_payment_options" (
    "payment_type" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "abbreviation" VARCHAR(15) NOT NULL,
    "id_required" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "last_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pos_payment_options_pkey" PRIMARY KEY ("payment_type")
);

-- AddForeignKey
ALTER TABLE "order_study" ADD CONSTRAINT "order_study_order_number_fkey" FOREIGN KEY ("order_number") REFERENCES "order"("order_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_study" ADD CONSTRAINT "order_study_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("study_id") ON DELETE RESTRICT ON UPDATE CASCADE;
