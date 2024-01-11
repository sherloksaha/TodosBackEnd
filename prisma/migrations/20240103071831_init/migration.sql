-- CreateTable
CREATE TABLE `User` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwords` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `hasPasswordChange` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
