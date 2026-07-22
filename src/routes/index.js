const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');


// Trang chủ
router.get('/', HomeController.home);


// About
router.get('/about', HomeController.about);


// Contact
router.get('/contact', HomeController.contact);


// Search
router.get('/search', HomeController.search);


// Create blog
router.get('/blogs/create', HomeController.create);


router.post('/blogs/create', HomeController.store);


// Login
router.get('/login', HomeController.login);


router.post('/login', HomeController.checkLogin);


module.exports = router;