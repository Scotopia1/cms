const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");
const Company = require("./companyModel");

class Project extends Model {
    constructor(Name, Description, StartDate, EndDate, Status, CompanyID) {
        super();
        this.Name = Name;
        this.Description = Description;
        this.StartDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.EndDate = EndDate ? moment(EndDate).format('YYYY-MM-DD HH:mm:ss') : null;
        this.Status = Status;
        this.CompanyID = CompanyID;
    }

    static fromRow(row) {
        return new Project(row);
    }
}

Project.init({
    ProjectID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    Status: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    CompanyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'CompanyID'
        }
    }
},
    {
    sequelize,
    modelName: Project,
    tableName: 'project',
    timestamps: false
});

module.exports = Project;