const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

// route home
router.get('/', homeController.home);
//menu
router.get('/menu', homeController.menu)
router.get('/set-menu', homeController.setMenu)

// route about
router.get('/about', homeController.about);

// route api
router.get('/api/users', homeController.users);

module.exports = router;