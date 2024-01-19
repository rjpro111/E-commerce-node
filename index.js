const express = require('express');
const port = 8007;
const app = express();
const path = require('path');
const db = require('./confige/mongoose');
const session = require('express-session');
const cookieparser=require('cookie-parser');


const passport = require('passport');
const passportLocal = require('./confige/passport-local-stretargy');




app.use(cookieparser());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name:'RWN',
    secret: 'RNW',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentic);

app.use(express.urlencoded());
app.use('/admin',require('./routes/admin'));
app.use('/',require('./routes/user'))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function (err) {
    if (err) {
        console.log("something went wronge");
    }
    console.log(`your server successfully run on port${port}`);
});