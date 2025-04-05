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
│── server.js           # Entry point of the application
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


## 📡 API Endpoints

### Companies Routes
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /companies        | Get all companies            |
| POST   | /companies        | Create new company           |
| GET    | /companies/:id    | Get single company           |
| PUT    | /companies/:id    | Update company               |
| DELETE | /companies/:id    | Delete company               |

### Projects Routes
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /projects         | Get all projects             |
| POST   | /projects         | Create new project           |
| GET    | /projects/:id     | Get single project           |
| PUT    | /projects/:id     | Update project               |
| DELETE | /projects/:id     | Delete project               |

### Tasks Routes
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /tasks            | Get all tasks                |
| POST   | /tasks            | Create new task              |
| GET    | /tasks/:id        | Get single task              |
| PUT    | /tasks/:id        | Update task                  |
| DELETE | /tasks/:id        | Delete task                  |

### Members Routes
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /members          | Get all members              |
| POST   | /members          | Create new member            |
| GET    | /members/:id      | Get single member            |
| PUT    | /members/:id      | Update member                |
| DELETE | /members/:id      | Delete member                |

### Managers Routes

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | /managers | Get all managers |
| POST | /managers | Create new manager |
| GET | /managers/:id | Get single manager |
| PUT | /managers/:id | Update manager |
| DELETE | /managers/:id | Delete manager |

### Relationship Routes

#### Handled By (Manager-Project Relationship)

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | /handled-by | Assign a manager to handle a project |
| DELETE | /handled-by?managerId=:managerId\&projectId=:projectId | Remove the manager-project relationship |

#### Task-Member Relationship

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | /task-members | Fetch all task-member associations |
| GET | /task-members/task/:taskId | Fetch all members assigned to a specific task |
| GET | /task-members/member/:memberId | Fetch all tasks assigned to a specific member |
| GET | /task-members/member/:memberId/tasks | Fetch detailed tasks assigned to a specific member |
| POST | /task-members | Assign a member to a task |
| DELETE | /task-members?taskId=:taskId\&memberId=:memberId | Remove a member from a task |

#### Works For (Member-Project Relationship)

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | /works-for | Assign a member to work on a project |
| DELETE | /works-for?memberId=:memberId\&projectId=:projectId | Remove the member-project relationship |

#### Partnership (Company-Company Relationship)

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | /partnerships | Create a partnership between two companies on a project |
| DELETE | /partnerships?company1=:company1\&company2=:company2\&projectId=:projectId\&managerId=:managerId | Remove a partnership between companies |

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

