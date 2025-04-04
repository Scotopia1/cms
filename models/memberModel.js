const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");
const Company = require("./companyModel");

class Member extends Model {
    constructor(Name, Email, Password, Position, CompanyID) {
        super();
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.Position = Position;
        this.CompanyID = CompanyID;
    }

    static fromRow(row) {
        return new Member(row);
    }
}

Member.init({
    MemberID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Password: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    Position: {
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
}, {
    sequelize,
    modelName: Member,
    tableName: 'member',
    timestamps: false
});

module.exports = Member;