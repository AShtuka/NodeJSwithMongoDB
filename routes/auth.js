const {Router} = require('express');
const router = Router();


router.get('/login', async (req, res, next) => {
    res.render('auth/login', {
        title: 'Auth',
        isLogin: true
    })
});

router.post('/', async (req, res) => {

});

module.exports = router;





