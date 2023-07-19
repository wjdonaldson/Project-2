const Recipe = require('../models/recipe');

module.exports = {
  create,
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

async function deleteIngredient(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    recipe.ingredients.splice(req.params.iid,1);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}
