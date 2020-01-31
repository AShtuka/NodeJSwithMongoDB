const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const expressReactView = require('express-react-views');
const path = require('path');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const User = require('./models/user');
const varMiddleware = require('./middleware/variables');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactView.createEngine());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'secret value',
    resave: false,
    saveUninitialized: false
}));
app.use(varMiddleware);
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://Alex:mongodb@mongolearningdb-dq4cp.mongodb.net/NodeJSwithMongoDB';
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();



