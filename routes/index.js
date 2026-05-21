const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

// route home
router.get('/', homeController.home);

// menu
router.get('/menu', homeController.menu);
router.get('/lang-menu', homeController.langMenu);
router.get('/set-menu', homeController.setMenu);

router.post('/set-banner', homeController.bannerHome);

router.get(
  "/sidebar-menu",
  homeController.getSidebarMenu
);

// route about
router.get('/about', homeController.about);

// route api
router.get('/api/users', homeController.users);

// contacts
router.post(
  '/quantri/contacts',
  require('../controller/contact').contactController
);

// articles
router.post(
  '/quantri/baiviet',
  ...require('../controller/quantribaiviet').articleController
);

module.exports = router;