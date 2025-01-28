/*
  Warnings:

  - You are about to drop the column `advanced` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `advanced` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `isAdvanced` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdvanced` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "advanced",
ADD COLUMN     "isAdvanced" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "advanced",
ADD COLUMN     "isAdvanced" BOOLEAN NOT NULL;
