const Blog = require('../models/Blogs');

class HomeController {

    home(req, res, next) {
        Blog.find({})
            .lean()
            .then(blogs => {
                res.render('home', { blogs });
            })
            .catch(next);
    }


    about(req, res) {
        res.render('about');
    }


    contact(req, res) {
        res.render('contact');
    }


    search(req, res) {
        res.send('Trang tìm kiếm');
    }


    // Hiển thị trang đăng bài
    create(req, res) {
        res.render('create');
    }


    // Lưu bài viết
    store(req, res, next) {

        const blog = new Blog({
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,

            // tạo slug tự động từ tiêu đề
            slug: req.body.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
        });


        blog.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }


    login(req, res) {
        res.send('Trang đăng nhập');
    }


    checkLogin(req, res) {
        res.send('Xử lý đăng nhập');
    }
}


module.exports = new HomeController();