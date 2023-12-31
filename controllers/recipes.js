const Recipe = require('../models/recipe');
const User = require('../models/user')
const Comment = require('../models/comment');

module.exports = {
  index,
  show,
  new: newRecipe,
  create,
  edit,
  update,
  createDirection,
  moveUpDirection,
  moveDownDirection,
  deleteDirection,
};

async function index(req, res) {
  try {
    const recipes = await Recipe.find({}).populate('user');
    res.render('recipes/index', { title: 'All Recipes', recipes });
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try{
//    const recipe = await Recipe.findById(req.params.id);
    const recipe = await Recipe.findById(req.params.id).populate('user');
    console.log(`recipe.show(): recipe= ${recipe}`);
    const comments = await Comment.find({recipe: recipe._id});
    res.render('recipes/show', { title: 'Recipe Detail', recipe, comments });
  } catch (err) {
    console.log(err);
  }
}

function newRecipe(req, res) {
  res.render('recipes/new', { title: 'Add Recipe', errorMsg: '' });
}

async function create(req, res) {
  try {
    console.log(`recipe.create(): user= ${req.user}`);
    req.body.user = req.user;
    const recipe = await Recipe.create(req.body);
    console.log(`recipe.create(): recipe= ${recipe}`);
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: err.message });
  }
}

// check if logged in user is recipe creater
// otherwise take them to the show page.
async function edit(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (req.user._id.equals(recipe.user)) {
      res.render('recipes/edit', { title: 'Edit Recipe', recipe});
    } else {
      res.redirect(`/recipes/${recipe._id}`);
    }
  } catch (err) {
    console.log(err);
  }

}

async function update(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    if (req.body.directions0) recipe.directions[0] = req.body.directions0;
    if (req.body.directions1) recipe.directions[1] = req.body.directions1;
    if (req.body.directions2) recipe.directions[2] = req.body.directions2;
    if (req.body.directions3) {
      if (recipe.directions.length < 4) {
        recipe.directions.push(req.body.directions3);
      } else {
        recipe.directions[3] = req.body.directions3;
      }
    };
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function createDirection(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.directions.push(req.body.direction);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function moveUpDirection(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    const idx = Number(req.params.idx);
    const tmpDirection = recipe.directions[idx];
    recipe.directions[idx] = recipe.directions[idx-1];
    recipe.directions[idx-1] = tmpDirection;
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function moveDownDirection(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    const idx = Number(req.params.idx);
    const tmpDirection = recipe.directions[idx];
    recipe.directions[idx] = recipe.directions[idx+1];
    recipe.directions[idx+1] = tmpDirection;
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

async function deleteDirection(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.rid);
    recipe.directions.splice(req.params.did,1);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${recipe._id}/edit`);
  }
}

