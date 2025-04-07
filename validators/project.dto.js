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

    body('Status')
        .isIn(['Pending', 'In Progress', 'Completed'])
        .withMessage('Status must be either pending or In progress or completed')
        .notEmpty()
        .withMessage('Status is required'),

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