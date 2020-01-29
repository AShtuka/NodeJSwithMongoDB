const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course);
    res.redirect('/cart');
});

router.get('/', (req, res) => {
   // const cart = await Cart.fetch();
   // res.render('cart',
   //     {title: 'Cart',
   //      isCart: true,
   //      courses: cart.courses,
   //      price: cart.price})
    res.json({test: true})
});

router.delete('/remove/:id', async (req, res) => {
    // const cart = await Cart.remove(req.params.id);
    // res.json(cart);
});


module.exports = router;