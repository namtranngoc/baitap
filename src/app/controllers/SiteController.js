const Blog = require('../models/Blog');

class SiteController{
    // [GET] /
    index(req, res, next) {
        // Lấy danh sách, dùng .lean() để chuyển sang JS Object thuần
        Blog.find({}).lean()
            .then(blogs => {
                // Truyền biến 'blogs' sang file giao diện home.hbs
                res.render('home', { blogs: blogs });
            })
            .catch(error => next(error));
    }

    // ... các hàm search, about, contact giữ nguyên ...
}

module.exports = new SiteController();