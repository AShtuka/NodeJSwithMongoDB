const {Router} = require('express');
const Order = require('../models/order');
const router = Router();

router.post('/', async (req, res) => {
    res.redirect('/orders');
});

router.get('/', async (req, res) => {
    res.render('orders', {isOrder: true, title: 'Orders'})
});

module.exports = router;