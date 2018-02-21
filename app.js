require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const authRoutes = require('./routes/oauth-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine', 'ejs');

app.use(cookieSession({
  macAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.once('open', () => {
  console.log('Connection has been made to mongodb');
}).on('error', (error)=>{
  console.log('connection error to db', error);
});

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//set up  routes
app.use('/auth', authRoutes);
app.use('/', routes);

//error handling
app.use( (err, req, res, next) => {
  res.status(422).send({ error: err});
});
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log('Server running at localhost:'+port);
});
