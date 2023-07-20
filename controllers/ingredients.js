const Recipe = require('../models/recipe');

module.exports = {
  create,
  moveUp,
  moveDown,
  delete: deleteIngredient,
};

async function create(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.ingredients.push(req.body);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function moveUp(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    const idx = Number(req.params.idx);
    const tmpIngredient = recipe.ingredients[idx];
    recipe.ingredients[idx] = recipe.ingredients[idx-1];
    recipe.ingredients[idx-1] = tmpIngredient;
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function moveDown(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    const idx = Number(req.params.idx);
    const tmpIngredient = recipe.ingredients[idx];
    recipe.ingredients[idx] = recipe.ingredients[idx+1];
    recipe.ingredients[idx+1] = tmpIngredient;
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function deleteIngredient(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    recipe.ingredients.splice(req.params.idx,1);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}
