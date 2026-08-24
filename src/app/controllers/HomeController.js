const Blog = require('../models/Blogs');
const transporter = require('../../config/mail');

class HomeController {

    // =========================
    // TRANG CHỦ + PHÂN TRANG
    // =========================
    home(req, res, next) {

        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = 3;

        const skip = (page - 1) * limit;

        Promise.all([

            Blog.countDocuments({}),

            Blog.find({})
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limit)
                .lean()

        ])

            .then(([totalBlogs, blogs]) => {

                const totalPages = Math.ceil(
                    totalBlogs / limit
                );

                const formatter = new Intl.DateTimeFormat(
                    'vi-VN',
                    {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }
                );

                const blogsWithDate = blogs.map(blog => ({

                    ...blog,

                    createdAtVN: blog.createdAt
                        ? formatter.format(
                            new Date(blog.createdAt)
                        )
                        : ''

                }));

                const pages = [];

                for (let i = 1; i <= totalPages; i++) {

                    pages.push({

                        number: i,

                        active: i === page

                    });

                }

                res.render('home', {

                    blogs: blogsWithDate,

                    currentPage: page,

                    totalPages: totalPages,

                    pages: pages,

                    hasPrevious: page > 1,

                    hasNext: page < totalPages,

                    previousPage: page - 1,

                    nextPage: page + 1

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
    // XỬ LÝ LIÊN HỆ + GỬI EMAIL
    // =========================
    async sendContact(req, res) {

        const {
            name,
            email,
            message
        } = req.body;


        console.log('==========================');
        console.log('📩 CÓ LIÊN HỆ MỚI');
        console.log('Họ và tên:', name);
        console.log('Email:', email);
        console.log('Tin nhắn:', message);
        console.log('==========================');


        try {

            await transporter.sendMail({

                // Email dùng để gửi
                from: process.env.MAIL_USER,

                // Email nhận
                to: process.env.MAIL_USER,

                // Khi bấm Reply sẽ trả lời người gửi
                replyTo: email,

                // Tiêu đề email
                subject: `Liên hệ từ Blog - ${name}`,

                // Nội dung email
                html: `

                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 700px;
                        margin: auto;
                    ">

                        <h2>
                            📩 Có liên hệ mới từ website Blog
                        </h2>

                        <hr>

                        <p>
                            <strong>Họ và tên:</strong>
                            ${name}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Nội dung:</strong>
                        </p>

                        <div style="
                            background: #f5f5f5;
                            padding: 15px;
                            border-radius: 8px;
                            white-space: pre-line;
                        ">
                            ${message}
                        </div>

                    </div>

                `

            });


            console.log('✅ GỬI EMAIL THÀNH CÔNG');


            // Gửi thành công
            res.render('contact', {

                success:
                    'Tin nhắn của bạn đã được gửi thành công!'

            });


        } catch (error) {

            console.error(
                '❌ LỖI GỬI EMAIL:',
                error
            );


            // Gửi thất bại
            res.render('contact', {

                error:
                    'Không thể gửi tin nhắn. Vui lòng thử lại sau.'

            });

        }

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

            content: req.body.content,

            image: req.body.image,

            slug: req.body.name

                .toLowerCase()

                .normalize('NFD')

                .replace(
                    /[\u0300-\u036f]/g,
                    ''
                )

                .replace(
                    /đ/g,
                    'd'
                )

                .replace(
                    /[^a-z0-9\s-]/g,
                    ''
                )

                .trim()

                .replace(
                    /\s+/g,
                    '-'
                )

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

            .replace(
                /[\u0300-\u036f]/g,
                ''
            )

            .replace(
                /đ/g,
                'd'
            )

            .replace(
                /[^a-z0-9\s-]/g,
                ''
            )

            .trim()

            .replace(
                /\s+/g,
                '-'
            );


        Blog.findByIdAndUpdate(

            req.params.id,

            {

                name: req.body.name,

                description: req.body.description,

                content: req.body.content,

                image: req.body.image,

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

        Blog.findByIdAndDelete(
            req.params.id
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