const {Router} = require('express');
const User = require('../models/user');
const router = Router();


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
    const user = await User.findById('5e31dccf2d687209d4b0cc66');
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    })
});

module.exports = router;





