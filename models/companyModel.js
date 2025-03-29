const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");


class Company extends Model {
    constructor(Name, Location, ContactInfo, Industry, Website) {
        super();
        this.Name = Name;
        this.Location = Location;
        this.ContactInfo = ContactInfo;
        this.Industry = Industry;
        this.Website = Website;
    }

    static fromRow(row) {
        return new Company(row);
    }
}

Company.init({
    CompanyID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    ContactInfo: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    Industry: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    Website: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Company',
    tableName: 'company',
    timestamps: false
});

module.exports = Company;