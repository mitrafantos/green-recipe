const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { sessionChecker } = require('../middleware/auth');
const { User } = require('../models/user');
const Recipe = require('../models/recipe');

const { ObjectId } = mongoose.Types;

const saltRounds = 10;
const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
  res.redirect('/users/login');
});

// user login
router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('users/login');
  })
  .post(async (req, res) => {
    try {
      const username = req.body.username.toLowerCase();
      const { password } = req.body;
      const user = await User.findOne({ username });
      if (username && password) {
        if (!user) {
          throw new Error('Такой логин не найден');
        } else if (!(await bcrypt.compare(password, user.password))) {
          throw new Error('Пароль не верный');
        } else {
          req.session.userID = user._id;
          req.session.username = user.username;
          res.redirect(`/users/${req.session.username}`);
        }
      } else {
        throw new Error('Введите все данные для входа');
      }
    } catch (error) {
      res.render('users/login', { error });
    }
  });

// user signup
router.get('/signup', sessionChecker, (req, res) => {
  res.render('users/signup');
});

router.post('/', async (req, res) => {
  try {
    const { password } = req.body;
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    if (username && email && password) {
      const findUsername = await User.findOne({ username });
      const findUsermail = await User.findOne({ email });
      if (findUsername) {
        throw new Error('Такой логин уже существует');
      } else if (findUsermail) {
        throw new Error('Такая почта уже существует');
      } else {
        const user = await User.create({
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
        });
        req.session.userID = user._id;
        req.session.username = user.username;
        res.redirect(`users/${req.session.userID}`);
      }
    } else {
      throw new Error('Введите все данные для регистрации');
    }
  } catch (error) {
    res.render('users/signup', { error });
  }
});

// user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.userID && req.cookies.user_sid) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid')
      res.redirect('/recipes');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/users/login');
  }
});

// user profile page
router.get('/:id', async (req, res) => {
  const { userID, username } = req.session;
  const recipes = await Recipe.find({ 'author._id': new ObjectId(userID) });
  res.render('users/profile', {
    recipes,
    userID,
    username,
  });
});

module.exports = router;
