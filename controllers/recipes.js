const Recipe = require('../models/recipe');
const Unit = require('../models/unit');

module.exports = {
  index,
  show,
  new: newRecipe,
  create
};

async function index(req, res) {
  const recipes = await Recipe.find({});
  res.render('recipes/index', { title: 'All Recipes', recipes });
}

async function show(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  const units = await Unit.find({}).sort('name'); // TODO: do I need this?
  res.render('recipes/show', { title: 'Recipe Detail', recipe, units });
}

function newRecipe(req, res) {
  res.render('recipes/new', { title: 'Add Recipe', errorMsg: '' });
}

async function create(req, res) {
  try {
    console.log(req.body);
    const recipe = await Recipe.create(req.body);
    if (req.body.directions0) recipe.directions.push(req.body.directions0);
    if (req.body.directions1) recipe.directions.push(req.body.directions1);
    if (req.body.directions2) recipe.directions.push(req.body.directions2);
    if (req.body.directions3) recipe.directions.push(req.body.directions3);
    if (req.body.directions4) recipe.directions.push(req.body.directions4);
    if (req.body.directions5) recipe.directions.push(req.body.directions5);
    if (req.body.directions6) recipe.directions.push(req.body.directions6);
    if (req.body.directions7) recipe.directions.push(req.body.directions7);
    if (req.body.directions8) recipe.directions.push(req.body.directions8);
    if (req.body.directions9) recipe.directions.push(req.body.directions9);
    if (req.body.directions10) recipe.directions.push(req.body.directions10);
    if (req.body.directions11) recipe.directions.push(req.body.directions11);
    if (req.body.directions12) recipe.directions.push(req.body.directions12);
    if (req.body.directions13) recipe.directions.push(req.body.directions13);
    if (req.body.directions14) recipe.directions.push(req.body.directions14);
    if (req.body.directions15) recipe.directions.push(req.body.directions15);
    if (req.body.directions16) recipe.directions.push(req.body.directions16);
    if (req.body.directions17) recipe.directions.push(req.body.directions17);
    if (req.body.directions18) recipe.directions.push(req.body.directions18);
    if (req.body.directions19) recipe.directions.push(req.body.directions19);
    console.log(recipe);
    await recipe.save();
    // res.redirect(`/recipes/${recipe._id}`, { title: 'Recipe Detail', recipe});
    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: err.message });
  }
}
