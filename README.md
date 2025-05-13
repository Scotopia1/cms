# Company Project Management System

## 📌 Overview

This is a API Server for a Company Project Management System. 
It allows users to manage companies, projects, tasks, members, 
and their relationships. The API is built using Node.js and Express.js, 
with MariaDB as the database.
## 🛠 Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MariaDB](https://www.MariaDB.com/) (v10.3 or later recommended)
- [Postman](https://www.postman.com/) (for API testing, optional)


## 📂 Project Structure

```
/project-root
│── src
│   ├── config          # Configuration files (db connection, etc.)
│   ├── controllers     # Business logic for API endpoints
│   ├── models          # Database models and schema
│   ├── repositories    # Database queries and interactions
│   ├── routes          # API route definitions
│   ├── services        # Business logic and service layer
│   ├── utils           # Utility functions
│   ├── validators      # Input validation logic
│── .env                # Environment variables
│── compaies-db.sql                # SQL scripts for database setup
│── package.json        # Dependencies and scripts
│── README.md           # Project documentation
│── index.js           # Entry point of the application
```


## 🚀 Installation &amp; Setup

1. **Clone repository**
```

git clone https://github.com/Scotopia1/cms.git
cd cms

```

2. **Install dependencies**
```

npm install express mariadb dotenv

```

3. **Configure environment**
Create `.env` file:
```

PORT=3300
DB_PORT=3307
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=root
DB_NAME=cms

```

4. **Database setup**
```

CREATE DATABASE cms;
USE cms;

# Run your provided SQL schema

```

5. **Start server**
```

npm start
```
#### or for development
```
npm run dev

```


## API Routes Documentation

### Company Routes
| Method | Endpoint                  | Description                      | Validators              | Controller Method                   |
|--------|---------------------------|----------------------------------|-------------------------|-------------------------------------|
| GET    | /companies                | Get all companies                | -                       | CompanyController.getCompanies      |
| GET    | /companies/name/:name     | Get company by name              | -                       | CompanyController.getCompanyByName  |
| GET    | /companies/:CompanyID     | Get company details              | validateCompanyId       | CompanyController.getCompanyDetails |
| POST   | /companies                | Create company                   | validateCompany         | CompanyController.createCompany     |
| PUT    | /companies/:CompanyID     | Update company                   | validateCompanyId       | CompanyController.updateCompany     |
| DELETE | /companies/:CompanyID     | Delete company                   | validateCompanyId       | CompanyController.deleteCompany     |

### Project Routes
| Method | Endpoint                           | Description                       | Validators                           | Controller Method                        |
|--------|------------------------------------|-----------------------------------|--------------------------------------|------------------------------------------|
| GET    | /projects/:CompanyID               | Get all projects                  | validateCompanyId                    | ProjectController.getProjectsByCompanyId |
| GET    | /projects/:CompanyID/:name         | Get project by name               | validateCompanyId                    | ProjectController.getProjectByName       |
| GET    | /projects/:ProjectID               | Get project details               | validateProjectId                    | ProjectController.getProjectDetails      |
| POST   | /projects/:CompanyID               | Create project                    | validateCompanyId, validateProject   | ProjectController.createProject          |
| PUT    | /projects/:ProjectID               | Update project                    | validateProjectId                    | ProjectController.updateProject          |
| DELETE | /projects/:ProjectID               | Delete project                    | validateProjectId                    | ProjectController.deleteProject          |

### Task Routes
| Method | Endpoint                           | Description                      | Validators                        | Controller Method                   |
|--------|------------------------------------|----------------------------------|-----------------------------------|-------------------------------------|
| GET    | /tasks/:ProjectID                  | Get all tasks by project         | validateProjectId                 | TasksController.getTasksByProjectId |
| GET    | /tasks/:ProjectID/:Title           | Get task by title                | validateProjectId, validateTask   | TasksController.getTaskByTitle      |
| GET    | /tasks/:ProjectID/:TaskID          | Get task by ID                   | validateProjectId, validateTaskId | TasksController.getTaskById         |
| POST   | /tasks/:ProjectID                  | Create task                      | validateProjectId, validateTask   | TasksController.createTask          |
| PUT    | /tasks/:ProjectID/:TaskID          | Update task                      | validateProjectId, validateTaskId | TasksController.updateTask          |
| DELETE | /tasks/:TaskID                     | Delete task                      | validateProjectId, validateTaskId | TasksController.deleteTask          |

### Member Routes
| Method | Endpoint                  | Description        | Validators                              | Controller Method                         |
|--------|---------------------------|--------------------|-----------------------------------------|-------------------------------------------|
| GET    | /members/:CompanyID       | Get all members    | validateMemberCompanyId                 | MemberController.getAllMembersByCompanyId |
| GET    | /members/:CompanyID/:name | Get member by name | validateMemberCompanyId                 | MemberController.getMemberByName          |
| GET    | /members/:MemberID        | Get member details | -                                       | MemberController.getMemberDetails         |
| GET    | /members/:MemberID        | Validate password  | validateMemberId                        | MemberController.isPasswordValid          |
| POST   | /members/:CompanyID       | Create member      | validateMemberCompanyId, validateMember | MemberController.createMember             |
| PUT    | /members/:MemberID        | Update member      | validateMemberId                        | MemberController.updateMember             |
| DELETE | /members/:MemberID        | Delete member      | validateMemberId                        | MemberController.deleteMember             |

### Manager Routes
| Method | Endpoint                          | Description                      | Validators                           | Controller Method                |
|--------|-----------------------------------|----------------------------------|--------------------------------------|----------------------------------|
| GET    | /managers/:CompanyID              | Get all managers                 | validateCompanyId                    | ManagerController.getManagers    |
| GET    | /managers/:ManagerID              | Get manager by ID                | validateManagerId                    | ManagerController.getManagerById |
| POST   | /managers/:CompanyID              | Create manager                   | validateCompanyId, validateManager   | ManagerController.createManager  |
| PUT    | /managers/:ManagerID              | Update manager                   | validateManagerId                    | ManagerController.updateManager  |
| DELETE | /managers/:ManagerID              | Delete manager                   | validateManagerId                    | ManagerController.deleteManager  |

### Task-Member Assignment Routes
| Method | Endpoint                                     | Description                         | Validators                       | Controller Method                             |
|--------|----------------------------------------------|-------------------------------------|----------------------------------|-----------------------------------------------|
| GET    | /task-members                                | Get all task members                | -                                | taskMemberController.getAllTaskMembers        |
| GET    | /task-members/task/:TaskID                   | Get members assigned to task        | validateTaskId                   | taskMemberController.getMembersAssignedToTask |
| GET    | /task-members/member/:MemberID               | Get tasks assigned to member        | validateMemberId                 | taskMemberController.getTasksAssignedToMember |
| GET    | /task-members/member/:MemberID/tasks/:TaskID | Get task details for member         | validateMemberId, validateTaskId | taskMemberController.getTaskDetailsForMember  |
| POST   | /task-members/task                           | Assign member to task               | -                                | taskMemberController.assignMemberToTask       |
| DELETE | /task-members                                | Unassign member from task           | -                                | taskMemberController.unassignMemberFromTask   |

### WorksFor Routes (Project-Member Association)
| Method | Endpoint                           | Description                       | Validators              | Controller Method                            |
|--------|------------------------------------|-----------------------------------|-------------------------|----------------------------------------------|
| GET    | /works-for                         | Get all work associations         | -                       | worksForController.getAllWorksFor            |
| GET    | /works-for/member/:MemberID        | Get projects by member            | validateMemberId        | worksForController.getProjectsByMember       |
| GET    | /works-for/project/:ProjectID      | Get members by project            | validateProjectId       | worksForController.getMembersByProject       |
| POST   | /works-for/project                 | Assign member to project          | -                       | worksForController.assignMemberToProject     |
| DELETE | /works-for                         | Unassign member from project      | -                       | worksForController.unassignMemberFromProject |

### HandledBy Routes (Project-Manager Association)
| Method | Endpoint                          | Description                       | Validators                | Controller Method                              |
|--------|-----------------------------------|-----------------------------------|---------------------------|------------------------------------------------|
| GET    | /handled-by                       | Get all manager assignments       | -                         | handledByController.getAllHandledBy            |
| GET    | /handled-by/:ManagerID            | Get projects by manager           | validateManagerId         | handledByController.getProjectsByManager       |
| GET    | /handled-by/project/:ProjectID    | Get manager by project            | validateProjectId         | handledByController.getManagerByProject        |
| POST   | /handled-by/project               | Assign manager to project         | -                         | handledByController.assignManagerToProject     |
| PUT    | /handled-by/project/manager       | Update project manager            | -                         | handledByController.updateHandledBy            |
| DELETE | /handled-by                       | Unassign manager from project     | -                         | handledByController.unassignManagerFromProject |
---

## 🛠 Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MariaDB** - Relational database
- **dotenv** - Environment variable management

## ✅ Best Practices
✔️ Follows MVC architecture  
✔️ Uses environment variables for security  
✔️ Implements error handling and validation  
✔️ Uses async/await for better promise handling


## 📝 License
This project is licensed under the MIT License.

---

