/*
  Warnings:

  - A unique constraint covering the columns `[profileId,advancedPostId]` on the table `Interaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interaction_profileId_advancedPostId_key" ON "Interaction"("profileId", "advancedPostId");
