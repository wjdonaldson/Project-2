const express = require('express');
const router = express.Router();

const ingredientsCtrl = require('../controllers/ingredients');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /
router.post('/recipes/:id/ingredients', ensureLoggedIn, ingredientsCtrl.create);
router.post('/recipes/:rid/ingredients/:idx/up', ensureLoggedIn, ingredientsCtrl.moveUp)
router.post('/recipes/:rid/ingredients/:idx/down', ensureLoggedIn, ingredientsCtrl.moveDown)
router.delete('/recipes/:rid/ingredients/:idx', ensureLoggedIn, ingredientsCtrl.delete)
	
module.exports = router;
