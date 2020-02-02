const {body} = require('express-validator');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

exports.registrationValidators = [
    body('email')
        .isEmail()
        .withMessage('Please, input correct email!')
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject('This email already exist');
                }
            } catch (e) {
                console.log(e);
            }
        })
        .normalizeEmail(),
    body('password', "Wrong password! Length between 6 and 30 symbols. And it have to be alphanumeric")
        .isLength({min: 6, max: 30})
        .isAlphanumeric()
        .trim(),
    body('passwordConfirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords not match!")
            }
            return true
         })
        .trim(),
    body('name')
        .isLength({min: 3})
        .withMessage("Min length for name 3 symbols")
        .trim()
];

exports.loginValidators = [
    body('email')
        .isEmail()
        .withMessage('Please, input correct email!')
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (!user) {
                    return Promise.reject('User with this email not exist');
                }

            } catch (e) {
                console.log(e);
            }
        }),
    body('password')
        .custom(async (value, {req}) => {
            const candidate = await User.findOne({email: req.body.email});
            if (candidate) {
                const isSame = await bcrypt.compare(value, candidate.password);
                if (isSame) {
                    const user = candidate;
                    req.session.user = user;
                    req.session.isAuthenticated = true;
                    req.session.save(err => {
                        if (err) {
                            return Promise.reject(err);
                        } else {
                            return true;
                        }
                    })
                } else {
                    return Promise.reject('Wrong password!');
                }
            }
        })
];

exports.passwordValidators = [
    body('password', "Wrong password! Length between 6 and 30 symbols. And it have to be alphanumeric")
        .isLength({min: 6, max: 30})
        .isAlphanumeric()
        .trim(),
];

exports.resetEmailValidators = [
    body('email')
        .isEmail()
        .withMessage('Please, input correct email!')
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (!user) {
                    return Promise.reject('User with this email not exist');
                }

            } catch (e) {
                console.log(e);
            }
        }),
];

exports.courseValidators = [
    body('title')
        .isLength({min: 3})
        .withMessage('Min title length 3 symbols')
        .trim(),
    body('price')
        .isNumeric()
        .withMessage('Input correct price'),
    body('img', "Input correct img URL!").isURL()
];