const express = require('express');
const router = express.Router();

const HomeController = require('../app/controllers/HomeController');

router.get('/', HomeController.home);

router.get('/about', HomeController.about);

router.get('/contact', HomeController.contact);

router.post('/contact', HomeController.sendContact);

router.get('/search', HomeController.search);

router.get('/blogs/create', HomeController.create);

router.post('/blogs/create', HomeController.store);

router.get('/login', HomeController.login);

router.post('/login', HomeController.checkLogin);

module.exports = router;
