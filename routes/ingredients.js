const express = require('express');
const router = express.Router();

const ingredientsCtrl = require('../controllers/ingredients');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /
router.post('/recipes/:id/ingredients', ingredientsCtrl.create);
router.post('/recipes/:rid/ingredients/:idx/up', ingredientsCtrl.moveUp)
router.post('/recipes/:rid/ingredients/:idx/down', ingredientsCtrl.moveDown)
router.delete('/recipes/:rid/ingredients/:idx', ingredientsCtrl.delete)
	
module.exports = router;
