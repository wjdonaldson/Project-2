const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  units: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

  const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  ingredients: [ingredientSchema],
  directions: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
