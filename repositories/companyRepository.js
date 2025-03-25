const db = require('../config/db');
const CompanyModel = require('../models/companyModel');

class CompanyRepository {
    /**
     * Method to create a company
     * @returns createdCompany
     * @param company
     */
    static async createCompany(company) {
        try {
            if (await this.companyExist(company.name)) {
                return;
            }
            let sql = `INSERT INTO company
                           (CompanyID, Name, Location, ContactInfo, Industry, Website)
                       VALUES (?, ?, ?, ?, ?, ?)`;

            const {affectedRows} = await db.query(sql, [company.Name, company.Location, company.ContactInfo,
                company.Industry, company.Website]);
            return {
                affectedRows
            }
        } catch (e) {
            // propagate an error
            throw new Error(e);
        }
    }

    static async readCompany(id) {
        let sql = `SELECT *
                   FROM company
                   WHERE CompanyID = ${id}`;
        const rows = await db.query(sql);
        return CompanyModel.fromRow(rows[0]);
    }

    static async readCompanies() {
        try {
            let sql = 'SELECT * FROM company';
            const rows = await db.query(sql);
            return rows.map(CompanyModel.fromRow);
        }catch (e) {
            throw new Error(e);
        }
    }

    static async companyExist(name) {
        let sql = `SELECT * FROM company WHERE Name = '${name}'`;
        const rows = await db.query(sql);
        return rows.length > 0;
    }

    static async deleteCompany(id) {
        let sql = 'DELETE FROM company WHERE CompanyID = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    }

    static async changeCompanyName(id, name) {
        let sql = `UPDATE company
                   SET Name = ?
                   WHERE CompanyID = ?`;
        const {affectedRows} = await db.query(sql, [name, id]);
        return {
            affectedRows
        }
    }

    static async changeCompanyLocation(id, location) {
        let sql = `UPDATE company
                   SET Location = ?
                   WHERE CompanyID = ?`;
        const {affectedRows} = await db.query(sql, [location, id]);
        return {
            affectedRows
        }
    }

    static async changeCompanyContactInfo(id, contactInfo) {
        let sql = `UPDATE company
                   SET ContactInfo = ?
                   WHERE CompanyID = ?`;
        const {affectedRows} = await db.query(sql, [contactInfo, id]);
        return {
            affectedRows
        }
    }

    static async changeCompanyIndustry(id, industry) {
        let sql = `UPDATE company
                   SET Industry = ?
                   WHERE CompanyID = ?`;
        const {affectedRows} = await db.query(sql, [industry, id]);
        return {
            affectedRows
        }
    }

    static async editCompanyWebsite(id, website) {
        let sql = `UPDATE company
                   SET Website = ?
                   WHERE CompanyID = ?`;
        const {affectedRows} = await db.query(sql, [website, id]);
        return {
            affectedRows
        }
    }

    static async getCompanybyName(name) {
        let sql = `SELECT *
                   FROM company
                   WHERE Name = '${name}'`;
        const rows = await db.query(sql);
        return CompanyModel.fromRow(rows[0]);
    }

    static async getCompanyDetails(id) {
        let sql = `SELECT *
                   FROM company
                   WHERE CompanyID = ${id}`;
        const rows = await db.query(sql);
        return CompanyModel.fromRow(rows[0]);
    }
}

module.exports = CompanyRepository;