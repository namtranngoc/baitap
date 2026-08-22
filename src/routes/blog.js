
const express = require('express');
const router = express.Router();

const BlogController = require('../app/controllers/BlogController');
const HomeController = require('../app/controllers/HomeController');


// ========================================
// TRANG CHỦ
// ========================================
// Ví dụ:
// /
// /?page=2
// /?page=3

router.get('/', HomeController.home);


// ========================================
// TRANG TẠO BÀI VIẾT
// ========================================

router.get('/create', HomeController.create);


// ========================================
// LƯU BÀI VIẾT
// ========================================

router.post('/create', HomeController.store);


// ========================================
// TRANG GIỚI THIỆU
// ========================================

router.get('/about', HomeController.about);


// ========================================
// TRANG LIÊN HỆ
// ========================================

router.get('/contact', HomeController.contact);


// ========================================
// XỬ LÝ FORM LIÊN HỆ
// ========================================

router.post('/contact', HomeController.sendContact);


// ========================================
// TÌM KIẾM
// ========================================

router.get('/search', HomeController.search);


// ========================================
// TRANG ĐĂNG NHẬP
// ========================================

router.get('/login', HomeController.login);


// ========================================
// XỬ LÝ ĐĂNG NHẬP
// ========================================

router.post('/login', HomeController.checkLogin);


// ========================================
// TRANG SỬA BÀI VIẾT
// ========================================
// Ví dụ:
// /blogs/65abc123/edit

router.get('/blogs/:id/edit', HomeController.edit);


// ========================================
// CẬP NHẬT BÀI VIẾT
// ========================================
// Ví dụ:
// PUT /blogs/65abc123

router.put('/blogs/:id', HomeController.update);


// ========================================
// XÓA BÀI VIẾT
// ========================================
// Ví dụ:
// DELETE /blogs/65abc123

router.delete('/blogs/:id', HomeController.delete);


// ========================================
// CHI TIẾT BÀI VIẾT
// ========================================
// ĐỂ CUỐI CÙNG
// Ví dụ:
// /blogs/bai-viet-cua-toi

router.get('/blogs/:slug', BlogController.show);


// ========================================
// EXPORT
// ========================================

module.exports = router;
