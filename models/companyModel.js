const moment = require("moment");

class Company {
    constructor(CompanyID, Name, Location, ContactInfo, Industry, Website) {
        this.CompanyID = CompanyID;
        this.Name = Name;
        this.Location = Location;
        this.ContactInfo = ContactInfo;
        this.Industry = Industry;
        this.Website = Website;
    }

    static async fromRow(row) {
        this.CompanyID = row.CompanyID;
        this.Name = row.Name;
        this.Location = row.Location;
        this.ContactInfo = row.ContactInfo;
        this.Industry = row.Industry;
        this.Website = row.Website;
    }
}

module.exports = Company;