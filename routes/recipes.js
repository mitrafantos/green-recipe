const express = require('express');

const router = express.Router();
const Recipe = require('../models/recipe');
const { User } = require('../models/user');
const Ingredient = require('../models/ingredient');
const parsePage = require('../utilities/parser');

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
  for (let i = 0; i < ingredients.links.length; i += 1) {
    const link = ingredients.links[i];
    const input = await parsePage(link);
    input.weight = ingredients.weights[i];
    const ingredient = new Ingredient(input);
    ingrs.push(ingredient);
  }
  const newRecipe = new Recipe({
    name,
    image,
    instructions,
    ingredients: ingrs,
    author: user,
    priceTotal: Math.round(ingrs.reduce((total, ingredient) => total + ingredient.priceTotal, 0)),
    caloriesTotal: Math.round(ingrs.reduce((total, ingredient) => total + ingredient.caloriesTotal, 0)),
  });
  await newRecipe.save();
  res.redirect('/recipes');
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
  res.redirect('/recipes');
});

// delete recipe
router.delete('/:id', async (req, res) => {
  await Recipe.deleteOne({ _id: req.params.id });
  res.redirect('/recipes');
});

module.exports = router;
