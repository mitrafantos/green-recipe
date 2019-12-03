const express = require('express');

const router = express.Router();
const Recipe = require('../models/recipe');
const { User } = require('../models/user');
const Ingredient = require('../models/ingredient');
const parsePage = require('../utilities/parser');

console.log('started recipes');

// recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.mostRecent();
  const { userID, username } = req.session;
  res.render('recipes/index', { recipes, userID, username });
});

// new recipe
router.get('/new', (req, res) => {
  const { userID, username } = req.session;
  res.render('recipes/new', { userID, username });
});

router.post('/', async (req, res) => {
  const {
    name, image, instructions,
  } = req.body;
  const ingredients = {
    links: req.body['links[]'],
    weights: req.body['weights[]'],
  };
  const user = await User.findById(req.session.userID);
  const ingrs = [];
  for (let i = 0; i < ingredients.links.length; i++) {
    const link = ingredients.links[i];
    try {
      const input = await parsePage(link);
      input.weight = ingredients.weights[i];
      const ingredient = new Ingredient(input);
      ingrs.push(ingredient);
    } catch (err) {
      res.render('error', { err });
    }
  }
  const newRecipe = new Recipe({
    name,
    image,
    instructions,
    ingredients: ingrs,
    author: user,
    priceTotal: ingrs.reduce((total, ingredient) => total + ingredient.priceTotal, 0),
    caloriesTotal: ingrs.reduce((total, ingredient) => total + ingredient.caloriesTotal, 0),
  });
  await newRecipe.save();
  console.log(newRecipe);
  res.redirect(`/users/${req.session.userID}`);
});

// detail Recipe
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const { userID, username } = req.session;
  res.render('recipes/detail', { recipe, userID, username });
});

// edit recipe
router.get('/:id/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const { userID, username } = req.session;
  res.render('recipes/edit', { recipe, userID, username });
});

router.put('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.itemName = req.body.itemName;
  recipe.description = req.body.description;
  recipe.condition = req.body.condition;
  recipe.startsAt = req.body.startsAt;
  recipe.endsAt = req.body.endsAt;
  await recipe.save();
  res.redirect(`/users/${req.session.userID}`);
});

// delete recipe
router.delete('/:id', async (req, res) => {
  await Recipe.deleteOne({ _id: req.params.id });
  res.redirect(`/users/${req.session.userID}`);
});

module.exports = router;
