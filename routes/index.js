const express = require('express');
const router = express.Router();
const multer = require('multer');
const homeController = require('../controller/homeController');


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});


// route home
router.get('/', homeController.home);

// menu
router.get('/menu', homeController.menu);
router.get('/lang-menu', homeController.langMenu);
router.post('/set-menu', homeController.setMenu);

router.post('/set-banner', homeController.bannerHome);
router.post('/setting-home',  upload.single("imgLogo"), homeController.setGeneralSettings);


router.post(
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