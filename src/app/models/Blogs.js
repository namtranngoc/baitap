
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Định nghĩa Schema cho Blog
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

    image: {
        type: String,
        maxLength: 255
    },

    slug: {
        type: String,
        maxLength: 255
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});


// Xuất Model
module.exports = mongoose.model('Blog', Blog);
