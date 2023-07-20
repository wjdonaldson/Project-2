const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /recipes
router.get('/', recipesCtrl.index);
router.get('/new', ensureLoggedIn, recipesCtrl.new);
router.get('/:id/edit', ensureLoggedIn, recipesCtrl.edit);
router.get('/:id', recipesCtrl.show);
router.put('/:id', ensureLoggedIn, recipesCtrl.update);
router.post('/:id/directions', ensureLoggedIn, recipesCtrl.createDirection);
router.post('/', ensureLoggedIn, recipesCtrl.create);
router.post('/:rid/directions/:idx/up', ensureLoggedIn, recipesCtrl.moveUpDirection)
router.post('/:rid/directions/:idx/down', ensureLoggedIn, recipesCtrl.moveDownDirection)
router.delete('/:rid/directions/:did', ensureLoggedIn, recipesCtrl.deleteDirection)
	
module.exports = router;
