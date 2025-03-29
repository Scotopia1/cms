const {body, param, validationResult} = require("express-validator");

const validateProject =[
    body('Name')
        .isString()
        .withMessage('Name must be string')
        .notEmpty()
        .withMessage('Name is required'),

    body('Description')
        .isString()
        .withMessage('Description must be string')
        .notEmpty()
        .withMessage('Description is required'),

    body('StartDate')
        .isDate()
        .withMessage('StartDate must be date')
        .notEmpty()
        .withMessage('StartDate is required'),

    body('EndDate')
        .isDate()
        .withMessage('EndDate must be date')
        .notEmpty()
        .withMessage('EndDate is required'),

    body('CompanyId')
        .notEmpty()
        .withMessage('Company ID is required')
        .isInt()
        .withMessage('Company ID must be integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateProjectId = [
    param('id').isInt().withMessage('ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }

];

module.exports = {
    validateProject,
    validateProjectId
};