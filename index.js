const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const expressReactView = require('express-react-views');
const flash = require('connect-flash');
const path = require('path');
const csrf = require('csurf');
const keys = require('./keys');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const errorPageHandler = require('./middleware/errorPage');

const app = express();
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URL
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactView.createEngine());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

app.use(errorPageHandler);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();




