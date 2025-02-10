/*
  Warnings:

  - You are about to drop the column `authorId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the `ProfileFriendship` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFriendship" DROP CONSTRAINT "ProfileFriendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFriendship" DROP CONSTRAINT "ProfileFriendship_profileId_fkey";

-- AlterTable
ALTER TABLE "AdvancedPost" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "authorId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfileFriendship";

-- CreateTable
CREATE TABLE "Friendship" (
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- CreateTable
CREATE TABLE "PendentFriendshipRequest" (
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendentFriendshipRequest_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendentFriendshipRequest" ADD CONSTRAINT "PendentFriendshipRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendentFriendshipRequest" ADD CONSTRAINT "PendentFriendshipRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
