require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo');
const passport = require('passport')

// Database Connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connection Successful!');
}).catch(err => {
    console.log('Connection was Unsuccessful...');
});


// Express Flash

app.use(flash())


// This following order is necessary for getting user 

// 1. Setting Static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// 2.  Session Configuration
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // This is the maximum time for cookie to be activated
    cookie: { maxAge: 10000 * 60 * 60 * 24 }, // 24 Hours
    store: new MongoDbStore({ mongoUrl: url }),

}))

// 3.  Passport.js Config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// 4. Global Middleware

app.use((req, res, next) => {
    // Making session available on front-end
    // session is like localStorage
    res.locals.session = req.session

    // Making user available on front-end
    // user is someone who
    res.locals.user = req.user;
    next();


})

// Routes
require('./routes/web')(app)

// Setting Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


// Activating Server
app.listen(PORT, () => {
    console.log(`Listening at : https://127.0.0.1:${PORT}`);
})
