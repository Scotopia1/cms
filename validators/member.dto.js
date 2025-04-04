const {body, param, validationResult} = require("express-validator");

const validateMember =[
    body('Name')
        .isString()
        .withMessage('Name must be string')
        .notEmpty()
        .withMessage('Name is required'),

    body('Email')
        .isEmail()
        .withMessage('Email must be email')
        .notEmpty()
        .withMessage('Email is required'),

    body('Password')
        .isString()
        .withMessage('Password must be string')
        .notEmpty()
        .withMessage('Password is required'),

    body('Position')
        .isString()
        .withMessage('Position must be string')
        .notEmpty()
        .withMessage('Position is required'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMemberId = [
    param('MemberID').isInt().withMessage('ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = {
    validateMember,
    validateMemberId
};