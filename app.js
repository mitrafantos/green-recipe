const express = require('express');

const app = express();
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const helpers = require('handlebars-helpers');
const { cookiesCleaner } = require('./middleware/auth');
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

// Подключаем mongoose.

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allows you to use PUT, DELETE with forms.
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

const fileStoreOptions = {};

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    key: 'user_sid',
    secret: 'super_secret_nano_code',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 9000000,
    },
  }),
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(cookiesCleaner);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  const { userID, username } = req.session;
  res.render('error', { userID, username });
});

module.exports = app;
