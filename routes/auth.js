const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../emails/sendEmail');
const reqEmail = require('../emails/registration');
const resetEmail = require('../emails/reset');


router.get('/login', async (req, res, next) => {
    res.render('auth/login', {
        title: 'Auth',
        isLogin: true,
        loginError: req.flash('loginError'),
        regError: req.flash('regError'),
    })
});

router.get('/logout', async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    });
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            const isSame = await bcrypt.compare(password, candidate.password);
            if (isSame) {
                const user = candidate;
                req.session.user = user;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect('/');
                    }
                })
            } else {
                req.flash('loginError', 'wrong password');
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'user with this email does not exist');
            res. redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
});

router.post('/registration', async (req, res, next) => {
    try {
        const {name, email, password, passwordConfirm} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            req.flash('regError', 'email already exists');
            res.redirect('/auth/login#registration')
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({name, email, password: hashPassword, cart: {items: []}});
            await user.save();
            res.redirect('/auth/login#login');
            await sendEmail(reqEmail(email));
        }
    } catch (e) {
        console.log(e)
    }
});

router.get('/reset', (req, res) => {
    res.render('auth/reset', {title: 'ForgotPassword', resetError: req.flash('resetError')})
});

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('resetError', 'Something wrong... Please try again later');
                return res.redirect('/auth/reset');
            }
            const token = buffer.toString('hex');
            const candidate = await User.findOne({email: req.body.email});
            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
                await candidate.save();
                await sendEmail(resetEmail(candidate.email, token));
                req.flash('loginError', 'Visit you email and click link to create new password');
                return res.redirect('/auth/login');
            } else {
                req.flash('resetError', 'user with this email does not exist');
                return res.redirect('/auth/reset');
            }
        })
    } catch (e) {
        console.log(e)
    }
});

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login');
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        });
        if (!user) {
            return res.redirect('/auth/login');
        } else {
            res.render('auth/password', {
                title: 'New Password',
                newPassError: req.flash('newPassError'),
                userId: user._id.toString(),
                token: req.params.token
            })
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/password', async (req, res) => {
   try {
       const user = await User.findOne({
           _id: req.body.userId,
           resetToken: req.body.token,
           resetTokenExp: {$gt: Date.now()}
       });
       if (user) {
           user.password = await bcrypt.hash(req.body.password, 10);
           user.resetToken = undefined;
           user.resetTokenExp = undefined;
           await user.save();
           res.redirect('/auth/login');
       } else {
           req.flash('loginError', 'You so slow, try again');
           res.redirect('/auth/login');
       }
   } catch (e) {
       console.log(e);
   }
});

module.exports = router;





