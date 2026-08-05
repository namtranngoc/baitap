const express = require('express');
const router = express.Router();

const BlogController = require('../app/controllers/BlogController');
const HomeController = require('../app/controllers/HomeController');


// Trang tạo bài viết
router.get('/create', HomeController.create);


// Lưu bài viết
router.post('/create', HomeController.store);


// Chi tiết bài viết (để cuối cùng)
router.get('/:slug', BlogController.show);


module.exports = router;