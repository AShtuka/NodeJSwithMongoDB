const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');


router.get('/login', async (req, res, next) => {
    res.render('auth/login', {
        title: 'Auth',
        isLogin: true
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
                res.redirect('/auth/login#login')
            }
        } else {
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
            res.redirect('/auth/registration#registration')
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({name, email, password: hashPassword, cart: {items: []}});
            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;





