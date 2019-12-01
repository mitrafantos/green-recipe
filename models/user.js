const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: 'Нужно ввести имя пользователя' },
  email: { type: String, required: 'Нужно ввести почту' },
  password: { type: String, required: 'Нужно ввести пароль' },
});

module.exports = {
  userSchema,
  User: mongoose.model('User', userSchema),
};
