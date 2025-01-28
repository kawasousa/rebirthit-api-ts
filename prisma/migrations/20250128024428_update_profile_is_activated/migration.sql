/*
  Warnings:

  - You are about to drop the column `activated` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `isActivated` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "activated",
ADD COLUMN     "isActivated" BOOLEAN NOT NULL;
