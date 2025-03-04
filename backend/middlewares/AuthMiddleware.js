const Joi = require('joi');

// Signup Validation Middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Name should have at least 3 characters',
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.min': 'Password should have at least 4 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),
        role: Joi.string().valid('user', 'admin').default('user').messages({
            'any.only': 'Role must be either user or admin'
        }) // Optional role validation
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
}

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.min': 'Password should have at least 4 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
