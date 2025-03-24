const db = require('../config/db');
const Company = require('../models/companyModel');

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
        return Company.fromRow(rows[0]);
    }

    static async readCompanies() {
        try {
            const rows = await db.query('SELECT * FROM company');
            return rows.map(Company.fromRow);
        } catch (e) {
            // propagate an error
            throw new Error(e.sqlMessage);
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
}