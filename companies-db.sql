CREATE TABLE COMPANY (
    CompanyID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(255),
    ContactInfo VARCHAR(255),
    Industry VARCHAR(255),
    Website VARCHAR(255)
);

CREATE TABLE PROJECT (
    ProjectID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    Budget DECIMAL(10, 2),
    Status VARCHAR(50),
    CompanyID INT NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES COMPANY(CompanyID)
);

CREATE TABLE MEMBER (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Skill TEXT,
    Role VARCHAR(50),
    Availability BOOLEAN,
    CompanyID INT NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES COMPANY(CompanyID)
);

CREATE TABLE MANAGER (
    ManagerID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    AdditionalResponsibility TEXT,
    MemberID INT UNIQUE,
    FOREIGN KEY (MemberID) REFERENCES MEMBER(MemberID)
);

CREATE TABLE TASK (
    TaskID INT PRIMARY KEY,
    TimeStamp DATETIME NOT NULL,
    Type VARCHAR(50),
    Status VARCHAR(50),
    ProjectID INT NOT NULL,
    ManagerID INT NOT NULL,
    Priority INT,
    Deadline DATETIME,
    FOREIGN KEY (ProjectID) REFERENCES PROJECT(ProjectID),
    FOREIGN KEY (ManagerID) REFERENCES MANAGER(ManagerID)
);

-- Relationships between entities
CREATE TABLE WORKS_FOR (
    MemberID INT NOT NULL,
    ProjectID INT NOT NULL,
    PRIMARY KEY (MemberID, ProjectID),
    FOREIGN KEY (MemberID) REFERENCES MEMBER(MemberID),
    FOREIGN KEY (ProjectID) REFERENCES PROJECT(ProjectID)
);

CREATE TABLE HANDLED_BY (
    ManagerID INT NOT NULL,
    ProjectID INT NOT NULL,
    PRIMARY KEY (ManagerID, ProjectID),
    FOREIGN KEY (ManagerID) REFERENCES MANAGER(ManagerID),
    FOREIGN KEY (ProjectID) REFERENCES PROJECT(ProjectID)
);

CREATE TABLE PARTNERSHIP (
    CompanyID1 INT NOT NULL,
    CompanyID2 INT NOT NULL,
    ProjectID INT NOT NULL,
    ManagerID INT NOT NULL,
    PRIMARY KEY (CompanyID1, CompanyID2, ProjectID, ManagerID),
    FOREIGN KEY (CompanyID1) REFERENCES COMPANY(CompanyID),
    FOREIGN KEY (CompanyID2) REFERENCES COMPANY(CompanyID),
    FOREIGN KEY (ProjectID) REFERENCES PROJECT(ProjectID),
    FOREIGN KEY (ManagerID) REFERENCES MANAGER(ManagerID)
);

-- Create the TASK_MEMBER table *without* the CHECK constraint
CREATE TABLE TASK_MEMBER (
    TaskID INT NOT NULL,
    MemberID INT NOT NULL,
    PRIMARY KEY (TaskID, MemberID),
    FOREIGN KEY (TaskID) REFERENCES TASK(TaskID),
    FOREIGN KEY (MemberID) REFERENCES MEMBER(MemberID)
);

-- Trigger to enforce that the Member is from the same Company as the Project
DELIMITER //  -- Change delimiter to allow multi-statement trigger

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

DELIMITER ;  -- Reset delimiter