-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.4.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for cms
CREATE DATABASE IF NOT EXISTS `cms` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `cms`;

-- Dumping structure for table cms.company
CREATE TABLE IF NOT EXISTS `company` (
  `CompanyID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `ContactInfo` varchar(255) DEFAULT NULL,
  `Industry` varchar(255) DEFAULT NULL,
  `Website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CompanyID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.handled_by
CREATE TABLE IF NOT EXISTS `handled_by` (
  `ManagerID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  PRIMARY KEY (`ManagerID`,`ProjectID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `handled_by_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `manager` (`ManagerID`),
  CONSTRAINT `handled_by_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.manager
CREATE TABLE IF NOT EXISTS `manager` (
  `ManagerID` int(11) NOT NULL AUTO_INCREMENT,
  `AdditionalResponsibility` text DEFAULT NULL,
  `MemberID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ManagerID`),
  UNIQUE KEY `MemberID` (`MemberID`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `member` (`MemberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.member
CREATE TABLE IF NOT EXISTS `member` (
  `MemberID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Position` varchar(50) DEFAULT NULL,
  `CompanyID` int(11) NOT NULL,
  PRIMARY KEY (`MemberID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `CompanyID` (`CompanyID`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`CompanyID`) REFERENCES `company` (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.project
CREATE TABLE IF NOT EXISTS `project` (
  `ProjectID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Status` enum('Pending','In Progress','Completed') DEFAULT NULL,
  `CompanyID` int(11) NOT NULL,
  PRIMARY KEY (`ProjectID`),
  KEY `CompanyID` (`CompanyID`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`CompanyID`) REFERENCES `company` (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.task
CREATE TABLE IF NOT EXISTS `task` (
  `TaskID` int(11) NOT NULL AUTO_INCREMENT,
  `TimeStamp` datetime NOT NULL DEFAULT current_timestamp(),
  `Title` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Status` enum('Pending','In Progress','Completed') DEFAULT NULL,
  `ProjectID` int(11) NOT NULL,
  `Priority` enum('1','2','3') DEFAULT NULL,
  `Deadline` datetime DEFAULT NULL,
  PRIMARY KEY (`TaskID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.task_member
CREATE TABLE IF NOT EXISTS `task_member` (
  `TaskID` int(11) NOT NULL,
  `MemberID` int(11) NOT NULL,
  PRIMARY KEY (`TaskID`,`MemberID`),
  KEY `MemberID` (`MemberID`),
  CONSTRAINT `task_member_ibfk_1` FOREIGN KEY (`TaskID`) REFERENCES `task` (`TaskID`),
  CONSTRAINT `task_member_ibfk_2` FOREIGN KEY (`MemberID`) REFERENCES `member` (`MemberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table cms.works_for
CREATE TABLE IF NOT EXISTS `works_for` (
  `MemberID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  PRIMARY KEY (`MemberID`,`ProjectID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `works_for_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `member` (`MemberID`),
  CONSTRAINT `works_for_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for trigger cms.TRG_TASK_MEMBER_Company
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER TRG_TASK_MEMBER_Company
BEFORE INSERT ON TASK_MEMBER
FOR EACH ROW
BEGIN
    DECLARE project_company INT;
    DECLARE member_company INT;

    -- Get the CompanyID of the project
    SELECT p.CompanyID INTO project_company
    FROM TASK t
    JOIN PROJECT p ON t.ProjectID = p.ProjectID
    WHERE t.TaskID = NEW.TaskID;

    -- Get the CompanyID of the member
    SELECT CompanyID INTO member_company
    FROM MEMBER
    WHERE MemberID = NEW.MemberID;

    -- Check if the member's company matches the project's company
    IF project_company != member_company THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Member must be from the same company as the project.';
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
