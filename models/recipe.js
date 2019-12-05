const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  instructions: String,
  priceTotal: String,
  caloriesTotal: String,
  ingredients: [],
  author: {},
});

recipeSchema.statics.mostRecent = async function () {
  return this.find()
    .limit(5)
    .exec();
};

module.exports = mongoose.model('Recipe', recipeSchema);
