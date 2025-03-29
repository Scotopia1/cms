const {body, param, validationResult} = require("express-validator");

const validateCompany =[
    body('Name')
        .isString()
        .withMessage('Name must be string')
        .notEmpty()
        .withMessage('Name is required'),

    body('Location')
        .isString()
        .withMessage('Location must be string')
        .notEmpty()
        .withMessage('Location is required'),

    body('ContactInfo')
        .isString()
        .withMessage('ContactInfo must be string')
        .notEmpty()
        .withMessage('ContactInfo is required'),

    body('Industry')
        .isString()
        .withMessage('Industry must be string')
        .notEmpty()
        .withMessage('Industry is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCompanyId = [
    body('CompanyID')
        .notEmpty()
        .withMessage('Company ID is required')
        .isInt()
        .withMessage('Company ID must be integer'),

    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }

];

module.exports = {
    validateCompany,
    validateCompanyId
};