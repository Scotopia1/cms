const {body, param, validationResult} = require("express-validator");

const validateTask = [
    body('Title')
        .isString()
        .withMessage('Title must be string')
        .notEmpty()
        .withMessage('Title is required'),

    body('Description')
        .isString()
        .withMessage('Description must be string')
        .notEmpty()
        .withMessage('Description is required'),

    body('Status')
        .isIn(['Pending', 'In Progress', 'Completed'])
        .withMessage('Status must be either Pending, In Progress or Completed')
        .notEmpty()
        .withMessage('Status is required'),

    body('Priority')
        .isIn(['1', '2', '3'])
        .withMessage('Priority must be either 1, 2 or 3')
        .notEmpty()
        .withMessage('Priority is required'),

    body('Deadline')
        .isDate()
        .withMessage('Deadline must be a date')
        .notEmpty()
        .withMessage('Deadline is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTaskId = [
    param('TaskID').isInt().withMessage('ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = {
    validateTask,
    validateTaskId
};