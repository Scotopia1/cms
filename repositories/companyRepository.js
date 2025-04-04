const db = require('../config/db');
const Company = require('../models/companyModel');

const CompanyRepository = {
    read: async () => {
        try {
            const rows = await db.query('SELECT * FROM company');
            return rows.map(Company.fromRow);
        } catch (error) {
            throw new Error(`Error fetching companies: ${error.message}`);
        }
    },

    readCompany: async (id) => {
        try {
            const sql = `SELECT * FROM company WHERE CompanyID = ${id}`;
            const rows = await db.query(sql);
            return Company.fromRow(rows[0]);
        } catch (error) {
            throw new Error(`Error fetching company with ID ${id}: ${error.message}`);
        }
    },

    readCompanyByName: async (name) => {
        try {
            const sql = `SELECT * FROM company WHERE Name = ${name}`;
            const rows = await db.query(sql);
            return Company.fromRow(rows[0]);
        } catch (error) {
            throw new Error(`Error fetching company with name ${name}: ${error.message}`);
        }
    },

    create: async (company) => {
        try {
            if (await this.companyExists(company.Name)) {
                return {
                    message: 'Company already exists'
                }
            }
            const sql = `INSERT INTO company (Name, Location, ContactInfo, Industry, Website) 
                         VALUES (?, ?, ?, ?, ?)`;
            const { affectedRows } = await db.query(sql, [
                company.Name,
                company.Location,
                company.ContactInfo,
                company.Industry,
                company.Website
            ]);
            console.log(affectedRows);
            return {
                affectedRows
            };
        } catch (error) {
            throw new Error(`Error creating company from repo: ${error.message}`);
        }
    },

    update: async (company) => {
        try {
            const sql = `UPDATE company SET 
                            Name = ?, 
                            Location = ?, 
                            ContactInfo = ?, 
                            Industry = ?, 
                            Website = ? 
                            WHERE CompanyID = ?`;
            const {affectedRows} = await db.query(sql, [company.Name, company.Location, company.ContactInfo, company.Industry, company.Website, company.CompanyID]);
            return {
                affectedRows
            };
        }catch (error) {
            throw new Error(`Error updating company: ${error.message}`);
        }
    },

    delete: async (CompanyID) => {
        try {
            const sql = `DELETE FROM company WHERE CompanyID = ?`;
            const { affectedRows } = await db.query(sql, [CompanyID]);
            return {
                affectedRows
            };
        } catch (error) {
            throw new Error(`Error deleting company with ID ${CompanyID}: ${error.message}`);
        }
    },

    companyExists: async (name) => {
        try {
            const sql = `SELECT * FROM company WHERE Name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if company exists: ${error.message}`);
        }
    }
}

module.exports = CompanyRepository;