const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");
const Member = require("./memberModel");

class Manager extends Model {
    constructor(MemberID, AdditionalResponsibilities) {
        super();
        this.MemberID = MemberID;
        this.AdditionalResponsibilities = AdditionalResponsibilities;
    }

    static fromRow(row) {
        return new Manager(row);
    }
}

Manager.init({
    ManagerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MemberID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Member,
            key: 'MemberID'
        }
    },
    AdditionalResponsibilities: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Manager',
    tableName: 'manager',
    timestamps: false
});

module.exports = Manager;