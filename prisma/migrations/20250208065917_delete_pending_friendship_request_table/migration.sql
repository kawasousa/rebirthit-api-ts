/*
  Warnings:

  - You are about to drop the `PendentFriendshipRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('Pending', 'Accepted');

-- DropForeignKey
ALTER TABLE "PendentFriendshipRequest" DROP CONSTRAINT "PendentFriendshipRequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "PendentFriendshipRequest" DROP CONSTRAINT "PendentFriendshipRequest_senderId_fkey";

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "status" "FriendshipStatus" NOT NULL DEFAULT 'Pending';

-- DropTable
DROP TABLE "PendentFriendshipRequest";
