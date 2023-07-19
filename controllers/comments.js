const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

module.exports = {
  create,
  delete: deleteComment,
};

async function create(req, res) {
  req.body.recipe = req.params.id;
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  try {
    await Comment.create(req.body);
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${req.params.id}`);
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    const rId = comment.recipe;
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/recipes/${rId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/recipes/${rId}`);
  }
}
