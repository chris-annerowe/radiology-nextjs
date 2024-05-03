/*
  Warnings:

  - The primary key for the `modality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `modalityid` on the `modality` table. All the data in the column will be lost.
  - Added the required column `modality_id` to the `modality` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "modality_modality_name_key";

-- AlterTable
ALTER TABLE "modality" DROP CONSTRAINT "modality_pkey",
DROP COLUMN "modalityid",
ADD COLUMN     "modality_id" BIGINT NOT NULL,
ADD CONSTRAINT "modality_pkey" PRIMARY KEY ("modality_id");

-- CreateTable
CREATE TABLE "appointment" (
    "appointment_id" BIGSERIAL NOT NULL,
    "appointment_time" TIMESTAMP(6),
    "patientid" VARCHAR(40),

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_number" VARCHAR(40) NOT NULL,
    "patient_id" VARCHAR(40),
    "payment_status" VARCHAR,
    "balance_outstanding" DOUBLE PRECISION,
    "report_status" VARCHAR,
    "report_zip_expiration_time" TIMESTAMP(6),
    "report_zip_link_expiration_time" TIMESTAMP(6),
    "report_zip_link" VARCHAR,
    "last_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_number")
);

-- CreateTable
CREATE TABLE "order_numbers" (
    "branch_code" VARCHAR NOT NULL,
    "order_number" VARCHAR
);

-- CreateTable
CREATE TABLE "patient" (
    "patient_id" VARCHAR(40) NOT NULL,
    "patient_uid" VARCHAR(40),
    "internalid" VARCHAR(15),
    "id_type" VARCHAR(3),
    "idnum" VARCHAR(40),
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "other_name" VARCHAR(60),
    "dob" TIMESTAMP(6),
    "address_1" VARCHAR(50),
    "address_2" VARCHAR(50),
    "city" VARCHAR(20),
    "post_code" VARCHAR(25),
    "parish" VARCHAR(25),
    "height" DECIMAL(10,4),
    "height_unit" VARCHAR(5),
    "weight" DECIMAL(10,4),
    "weight_unit" VARCHAR(5),
    "telephone_1" VARCHAR(40),
    "telephone_2" VARCHAR(40),
    "fax" VARCHAR(40),
    "cellular" VARCHAR(40),
    "entry_date" TIMESTAMP(6),
    "next_kin" VARCHAR(255),
    "guardian" VARCHAR(30),
    "sex" VARCHAR(1),
    "age" INTEGER,
    "months" INTEGER,
    "days" INTEGER,
    "branchcode" VARCHAR(3),
    "title" VARCHAR(40),
    "nationality" VARCHAR(2),
    "inuse" INTEGER DEFAULT 0,
    "userid" INTEGER DEFAULT 0,
    "last_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "race" INTEGER DEFAULT 1,
    "email" VARCHAR(100),

    CONSTRAINT "patient_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "study" (
    "study_id" BIGINT NOT NULL,
    "study_name" VARCHAR(40),
    "study_description" VARCHAR,

    CONSTRAINT "study_pkey" PRIMARY KEY ("study_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(50),
    "username" VARCHAR(50),
    "password" VARCHAR(50),
    "createdat" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worklist" (
    "worklist_id" BIGSERIAL NOT NULL,
    "accession_number" VARCHAR(40),
    "patient_uid" VARCHAR(40),
    "study_uid" VARCHAR(40),
    "study_description" VARCHAR,
    "study_date" VARCHAR(8),
    "study_time" VARCHAR,
    "modality" VARCHAR,
    "patient_name" VARCHAR,
    "department" VARCHAR,
    "patient_dob" VARCHAR,
    "patient_gender" VARCHAR(1),

    CONSTRAINT "worklist_pkey" PRIMARY KEY ("worklist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_numbers_branch_code_key" ON "order_numbers"("branch_code");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
