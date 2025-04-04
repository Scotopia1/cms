const {body, param, validationResult} = require("express-validator");

const validateManager = [
    body('AdditionalResponsibility')
        .isString()
        .withMessage('Additional Responsibility must be string'),

    ( req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }];

const validateManagerId = [
    param('ManagerID').isInt().withMessage('ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = {
    validateManager,
    validateManagerId
};