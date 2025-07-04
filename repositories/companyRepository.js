const db = require('../config/db');
const Company = require('../models/companyModel');

const CompanyRepository = {
    /**
     * Fetches all companies from the database.
     * @returns {Promise<*>}
     */
    read: async () => {
        try {
            const rows = await db.query('SELECT * FROM company');
            return rows.map(Company.fromRow);
        } catch (error) {
            throw new Error(`Error fetching companies: ${error.message}`);
        }
    },

    /**
     * Fetches a company by its ID.
     * @param id
     * @returns {Promise<Company>}
     */
    readCompany: async (id) => {
        try {
            const sql = `SELECT * FROM company WHERE CompanyID = ${id}`;
            const rows = await db.query(sql);
            return Company.fromRow(rows[0]);
        } catch (error) {
            throw new Error(`Error fetching company with ID ${id}: ${error.message}`);
        }
    },

    /**
     * Fetches a company by its name.
     * @param name
     * @returns {Promise<Company>}
     */
    readCompanyByName: async (name) => {
        try {
            const sql = `SELECT * FROM company WHERE Name = ${name}`;
            const rows = await db.query(sql);
            return Company.fromRow(rows[0]);
        } catch (error) {
            throw new Error(`Error fetching company with name ${name}: ${error.message}`);
        }
    },

    /**
     * Creates a new company in the database.
     * @param company
     * @returns {Promise<{affectedRows: *}|{message: string}>}
     */
    create: async (company) => {
        try {
            if (await CompanyRepository.companyExists(company.Name)) {
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

    /**
     * Updates an existing company in the database.
     * @param company
     * @returns {Promise<{affectedRows: *}>}
     */
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
    /**
     * Sets a user as an admin for a company.
     * @param companyID
     * @param userID
     * @returns {Promise<{affectedRows: *}>}
     */
    setAdmin: async (companyID, userID) => {
        try {
            const sql = `UPDATE company SET Admin = ? WHERE CompanyID = ?`;
            const { affectedRows } = await db.query(sql, [userID, companyID]);
            return {
                affectedRows
            };
        } catch (error) {
            throw new Error(`Error setting admin for company with ID ${companyID}: ${error.message}`);
        }
    },

    /**
     * Deletes a company from the database.
     * @param CompanyID
     * @returns {Promise<{affectedRows: *}>}
     */
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

    /**
     * Checks if a company exists in the database by its name.
     * @param name
     * @returns {Promise<boolean>}
     */
    companyExists: async (name) => {
        try {
            const sql = `SELECT * FROM company WHERE Name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if company exists: ${error.message}`);
        }
    },

    /**
     * Checks if a company exists in the database by its name.
     * @param name
     * @returns {Promise<boolean>}
     */
    companyExistsbyId: async (CompanyID) => {
        try {
            const sql = `SELECT * FROM company WHERE CompanyID = ?`;
            const rows = await db.query(sql, [CompanyID]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if company exists: ${error.message}`);
        }
    }

}

module.exports = CompanyRepository;