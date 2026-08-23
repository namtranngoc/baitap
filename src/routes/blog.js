
const express = require('express');

const router = express.Router();


const BlogController =
    require('../app/controllers/BlogController');

const HomeController =
    require('../app/controllers/HomeController');


// ========================================
// TRANG CHỦ
// ========================================
// /
// /?page=2
// /?page=3

router.get(
    '/',
    HomeController.home
);


// ========================================
// TRANG TẠO BÀI VIẾT
// ========================================

router.get(
    '/create',
    HomeController.create
);


// ========================================
// LƯU BÀI VIẾT
// ========================================

router.post(
    '/create',
    HomeController.store
);


// ========================================
// TRANG GIỚI THIỆU
// ========================================

router.get(
    '/about',
    HomeController.about
);


// ========================================
// TRANG LIÊN HỆ
// ========================================

router.get(
    '/contact',
    HomeController.contact
);


// ========================================
// XỬ LÝ LIÊN HỆ
// ========================================

router.post(
    '/contact',
    HomeController.sendContact
);


// ========================================
// TÌM KIẾM
// ========================================

router.get(
    '/search',
    HomeController.search
);


// ========================================
// ĐĂNG NHẬP
// ========================================

router.get(
    '/login',
    HomeController.login
);


// ========================================
// XỬ LÝ ĐĂNG NHẬP
// ========================================

router.post(
    '/login',
    HomeController.checkLogin
);


// ========================================
// SỬA BÀI VIẾT
// ========================================

router.get(
    '/blogs/:id/edit',
    HomeController.edit
);


// ========================================
// CẬP NHẬT BÀI VIẾT
// ========================================

router.put(
    '/blogs/:id',
    HomeController.update
);


// ========================================
// XÓA BÀI VIẾT
// ========================================

router.delete(
    '/blogs/:id',
    HomeController.delete
);


// ========================================
// CHI TIẾT BÀI VIẾT
// PHẢI ĐỂ CUỐI
// ========================================

router.get(
    '/blogs/:slug',
    BlogController.show
);


module.exports = router;
