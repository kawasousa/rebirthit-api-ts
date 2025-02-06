/*
  Warnings:

  - You are about to drop the column `postId` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `advancedPostId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_postId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "postId",
ADD COLUMN     "advancedPostId" TEXT NOT NULL,
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AdvancedPost" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdvancedPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdvancedPost" ADD CONSTRAINT "AdvancedPost_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_advancedPostId_fkey" FOREIGN KEY ("advancedPostId") REFERENCES "AdvancedPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
