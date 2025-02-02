/*
  Warnings:

  - You are about to drop the column `advancedPostId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `isAdvanced` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `AdvancedPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Default', 'Admin');

-- DropForeignKey
ALTER TABLE "AdvancedPost" DROP CONSTRAINT "AdvancedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_advancedPostId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFriendship" DROP CONSTRAINT "ProfileFriendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFriendship" DROP CONSTRAINT "ProfileFriendship_profileId_fkey";

-- DropIndex
DROP INDEX "Profile_nickname_key";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "advancedPostId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "isAdvanced",
DROP COLUMN "nickname",
DROP COLUMN "photo_url",
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "isActivated" SET DEFAULT true;

-- DropTable
DROP TABLE "AdvancedPost";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileFriendship" ADD CONSTRAINT "ProfileFriendship_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileFriendship" ADD CONSTRAINT "ProfileFriendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
