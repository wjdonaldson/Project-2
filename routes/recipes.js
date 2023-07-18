const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /recipes
router.get('/', recipesCtrl.index);
router.get('/new', ensureLoggedIn, recipesCtrl.new);
router.get('/:id', recipesCtrl.show);

router.post('/', ensureLoggedIn, recipesCtrl.create);
	
module.exports = router;
