const {Router} = require('express');
const auth = require('../middleware/auth');
const router = Router();
const User = require('../models/user');
const path = require('path');

router.get('/', auth, async (req, res, next) => {
    res.render('profile', {
        title : 'Main page',
        isProfile: true,
        user: req.user.toObject()});
});

router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const toChange = {
            name: req.body.name
        };
        if (req.file) {
            toChange.avatarUrl = req.file.path.slice(7);
        }

        Object.assign(user, toChange);
        await user.save();
        res.redirect('/profile');
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;