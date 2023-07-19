const express = require('express');
const router = express.Router();

const ingredientsCtrl = require('../controllers/ingredients');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// all routes  start with /
router.post('/recipes/:id/ingredients', ingredientsCtrl.create);
router.delete('/recipes/:rid/ingredients/:iid', ingredientsCtrl.delete)
	
module.exports = router;
