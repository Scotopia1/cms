const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");

class MemberModel extends Model {
    constructor(Name, Position, Email, CompanyID) {
        super();
        this.Name = Name;
        this.Position = Position;
        this.Email = Email;
        this.CompanyID = CompanyID;
    }

    static fromRow(row) {
        return new MemberModel(row);
    }
}

MemberModel.init({
    MemberID: {
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
    Position: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
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
    Availability: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    CompanyID: {
        type: DataTypes.STRING,
        length: 11,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Member',
    tableName: 'member',
    timestamps: false
});

module.exports = MemberModel;