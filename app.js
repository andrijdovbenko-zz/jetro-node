let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let ejsLocals = require('ejs-locals');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);

let home = require('./routes/home');
let blog = require('./routes/blog');
let admin = require('./routes/admin');
let login = require('./routes/login');
let about = require('./routes/about');
let registration = require('./routes/registration');
let portfolio = require('./routes/portfolio');
let contact = require('./routes/contact');
let db = require('./db-connect');
let keys = require('./keys.json');

let app = express();
app.engine('ejs', ejsLocals);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboardCat',
  key: 'sid',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  store: new MongoStore({url: `mongodb://${keys.mLab.dbuser}:${keys.mLab.dbpassword}@ds127854.mlab.com:27854/jetro`})
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/blog', blog);
app.use('/admin', admin);
app.use('/login', login);
app.use('/about', about);
app.use('/portfolio', portfolio);
app.use('/contact', contact);
app.use('/registration', registration);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
