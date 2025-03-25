const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/db-sequelize');
const moment = require("moment");

class CompanyModel extends Model {
    constructor(Name, Location, ContactInfo, Industry, Website) {
        super();
        this.Name = Name;
        this.Location = Location;
        this.ContactInfo = ContactInfo;
        this.Industry = Industry;
        this.Website = Website;
    }

    static fromRow(row) {
        return new CompanyModel(row);
    }
}

CompanyModel.init({
    CompanyID: {
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
    Location: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: true
    },
    ContactInfo: {
        type: DataTypes.STRING,
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

module.exports = CompanyModel;