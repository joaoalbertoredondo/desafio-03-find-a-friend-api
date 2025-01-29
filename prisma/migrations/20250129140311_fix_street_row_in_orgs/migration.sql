/*
  Warnings:

  - You are about to drop the column `streer` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `street` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "streer",
ADD COLUMN     "street" TEXT NOT NULL;
