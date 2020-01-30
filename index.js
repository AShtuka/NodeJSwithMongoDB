const express = require('express');
const mongoose = require('mongoose');
const expressReactView = require('express-react-views');
const path = require('path');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const User = require('./models/user');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactView.createEngine());

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e31dccf2d687209d4b0cc66');
        req.user = user;
        next()
    } catch (e) {
        console.log(e)
    }
});

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://Alex:mongodb@mongolearningdb-dq4cp.mongodb.net/NodeJSwithMongoDB';
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'sasha@gmail.com',
                name: 'Sasha',
                cart: {items: []}
            })
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();



