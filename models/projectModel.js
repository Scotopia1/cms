const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");

class ProjectModel extends Model {
    constructor(Name, Description, StartDate, EndDate, Status) {
        super();
        this.Name = Name;
        this.Description = Description;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Status = Status;
    }

    static fromRow(row) {
        return new ProjectModel(row);
    }
}

ProjectModel.init({
    ProjectID: {
        type: DataTypes.STRING,
        length: 11,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Budget: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    CompanyID: {
        type: DataTypes.STRING,
        length: 11,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'project',
    timestamps: false
});

module.exports = ProjectModel;