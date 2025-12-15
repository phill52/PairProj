/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `areas_of_interests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `skills` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `areas_of_interests` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `areas_of_interests` DROP FOREIGN KEY `areas_of_interests_userId_fkey`;

-- DropIndex
DROP INDEX `areas_of_interests_userId_fkey` ON `areas_of_interests`;

-- AlterTable
ALTER TABLE `areas_of_interests` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skills` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `areas_of_interests_userId_key` ON `areas_of_interests`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `skills_userId_key` ON `skills`(`userId`);

-- AddForeignKey
ALTER TABLE `areas_of_interests` ADD CONSTRAINT `areas_of_interests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
