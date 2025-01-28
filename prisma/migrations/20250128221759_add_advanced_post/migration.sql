/*
  Warnings:

  - You are about to drop the column `postId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `isAdvanced` on the `Post` table. All the data in the column will be lost.
  - Added the required column `advancedPostId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_postId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "postId",
ADD COLUMN     "advancedPostId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isAdvanced";

-- CreateTable
CREATE TABLE "AdvancedPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "AdvancedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdvancedPost_postId_key" ON "AdvancedPost"("postId");

-- AddForeignKey
ALTER TABLE "AdvancedPost" ADD CONSTRAINT "AdvancedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_advancedPostId_fkey" FOREIGN KEY ("advancedPostId") REFERENCES "AdvancedPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
