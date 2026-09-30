
CREATE DATABASE IF NOT EXISTS `Warhouse-Gym`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE `Warhouse-Gym`;
CREATE TABLE IF NOT EXISTS `Members` (
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `name`         VARCHAR(100) NOT NULL,
    `age`          INT          NOT NULL,
    `plan`         VARCHAR(50)  NOT NULL,
    `phoneno`      VARCHAR(15)  NOT NULL,
    `address`      TEXT         NOT NULL,
    `days_present` INT          NOT NULL DEFAULT 0,
    `joined_date`  DATE         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify
SELECT 'Database and table created successfully!' AS Status;
