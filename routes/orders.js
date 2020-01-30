const {Router} = require('express');
const Order = require('../models/order');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const user =await req.user
            .populate('cart.items.courseId')
            .execPopulate();

        const courses = user.cart.items.map(item => ({count: item.count, course: {...item.courseId._doc}}));
        const order = new Order({
            user: {name: req.user.name, userId: req.user},
            courses: courses
        });

        await order.save();
        await req.user.cleanCart();

        res.redirect('/orders');
    } catch (e) {
        console.log(e)
    }

});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({'user.userId': req.user._id})
            .populate('user.userId');

        res.render('orders',
            {
                isOrder: true,
                title: 'Orders',
                orders: orders.map(order => (
                    {
                        ...order._doc,
                        price: order.courses.reduce(
                            (total, item) => {return total += item.count * item.course.price},
                            0)
                    }))
            })
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;