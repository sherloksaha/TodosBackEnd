-- CreateTable
CREATE TABLE `Todos` (
    `tid` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `lastDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
