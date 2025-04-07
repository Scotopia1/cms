const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");
const Project = require("./projectModel");

class Task extends Model {
    constructor(Title, Description, ProjectID, Priority, Deadline) {
        super();
        this.TimeStamp = moment().format('YYYY-MM-DD HH:mm:ss');
        this.Title = Title;
        this.Description = Description;
        this.status = 'Pending';
        this.ProjectID = ProjectID;
        this.Priority = Priority;
        this.Deadline = Deadline.format('YYYY-MM-DD HH:mm:ss');
    }

    static fromRow(row) {
        return new Task(row);
    }
}

Task.init({
    TaskID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TimeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        allowNull: false,
        defaultValue: 'Pending'
    },
    ProjectID: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'ProjectID'
        }
    },
    Priority: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: false,
        defaultValue: '2'
    },
    Deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
});

module.exports = Task;