const Blog = require('../models/Blogs');

class HomeController {

    // =========================
    // TRANG CHỦ
    // =========================
    home(req, res, next) {
        Blog.find({})
            .lean()
            .then(blogs => {

                // Format ngày sang tiếng Việt
                const formatter = new Intl.DateTimeFormat('vi-VN', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });

                // Thêm createdAtVN vào từng bài viết
                const blogsWithDate = blogs.map(blog => ({
                    ...blog,
                    createdAtVN: blog.createdAt
                        ? formatter.format(new Date(blog.createdAt))
                        : ''
                }));

                res.render('home', {
                    blogs: blogsWithDate
                });
            })
            .catch(next);
    }


    // =========================
    // TRANG GIỚI THIỆU
    // =========================
    about(req, res) {
        res.render('about');
    }


    // =========================
    // TRANG LIÊN HỆ
    // =========================
    contact(req, res) {
        res.render('contact');
    }


    // =========================
    // XỬ LÝ LIÊN HỆ
    // =========================
    sendContact(req, res) {

        const {
            name,
            email,
            message
        } = req.body;

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        res.render('contact', {
            success: 'Tin nhắn của bạn đã được gửi thành công!'
        });
    }


    // =========================
    // TÌM KIẾM
    // =========================
    search(req, res) {
        res.send('Trang tìm kiếm');
    }


    // =========================
    // TRANG ĐĂNG BÀI
    // =========================
    create(req, res) {
        res.render('create');
    }


    // =========================
    // LƯU BÀI VIẾT
    // =========================
    store(req, res, next) {

        const blog = new Blog({

            name: req.body.name,

            description: req.body.description,

            // Nội dung chi tiết
            content: req.body.content,

            // Link ảnh
            image: req.body.image,

            // Tạo slug tự động từ tiêu đề
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


    // =========================
    // TRANG SỬA BÀI VIẾT
    // =========================
    edit(req, res, next) {

        Blog.findOne({
            _id: req.params.id
        })
            .lean()
            .then(blog => {

                if (!blog) {
                    return res.status(404).send(
                        'Không tìm thấy bài viết'
                    );
                }

                res.render('edit', {
                    blog
                });

            })
            .catch(next);
    }


    // =========================
    // CẬP NHẬT BÀI VIẾT
    // =========================
    update(req, res, next) {

        const newSlug = req.body.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');

        Blog.findByIdAndUpdate(

            req.params.id,

            {
                name: req.body.name,

                description: req.body.description,

                // Nội dung chi tiết
                content: req.body.content,

                // Link ảnh
                image: req.body.image,

                // Slug mới
                slug: newSlug
            },

            {
                new: true,
                runValidators: true
            }
        )
            .then(blog => {

                if (!blog) {
                    return res.status(404).send(
                        'Không tìm thấy bài viết'
                    );
                }

                res.redirect('/');

            })
            .catch(next);
    }


    // =========================
    // XÓA BÀI VIẾT
    // =========================
    delete(req, res, next) {

        Blog.findByIdAndDelete(req.params.id)
            .then(blog => {

                if (!blog) {
                    return res.status(404).send(
                        'Không tìm thấy bài viết'
                    );
                }

                res.redirect('/');

            })
            .catch(next);
    }


    // =========================
    // ĐĂNG NHẬP
    // =========================
    login(req, res) {
        res.send('Trang đăng nhập');
    }


    // =========================
    // XỬ LÝ ĐĂNG NHẬP
    // =========================
    checkLogin(req, res) {
        res.send('Xử lý đăng nhập');
    }
}


module.exports = new HomeController();
