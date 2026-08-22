const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// =========================
// SCHEMA BLOG
// =========================

const Blog = new Schema({

    name: {
        type: String,
        maxLength: 255
    },

    description: {
        type: String,
        maxLength: 600
    },

    // Nội dung chi tiết bài viết
    content: {
        type: String
    },

    // Link hình ảnh
    image: {
        type: String,
        maxLength: 255
    },

    // Đường dẫn bài viết
    slug: {
        type: String,
        maxLength: 255
    },

    // Ngày đăng bài
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Ngày cập nhật
    updatedAt: {
        type: Date,
        default: Date.now
    }

});


// =========================
// TỰ CẬP NHẬT updatedAt
// KHI SỬA BÀI
// =========================

Blog.pre('findOneAndUpdate', function(next) {

    this.set({
        updatedAt: new Date()
    });

    next();

});


// =========================
// XUẤT MODEL
// =========================

module.exports = mongoose.model('Blog', Blog);
