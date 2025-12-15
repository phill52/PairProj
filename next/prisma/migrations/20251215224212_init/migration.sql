-- AlterTable
ALTER TABLE `areas_of_interests` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `areas_of_interests` ADD CONSTRAINT `areas_of_interests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
