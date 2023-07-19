const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /recipes
router.get('/', recipesCtrl.index);
router.get('/new', /*ensureLoggedIn,*/ recipesCtrl.new);
router.get('/:id/edit', recipesCtrl.edit);
router.get('/:id', recipesCtrl.show);
router.put('/:id', recipesCtrl.update);
router.post('/:id/directions', recipesCtrl.createDirection);
router.post('/', /*ensureLoggedIn,*/ recipesCtrl.create);
router.delete('/:rid/directions/:did', recipesCtrl.deleteDirection)
	
module.exports = router;
