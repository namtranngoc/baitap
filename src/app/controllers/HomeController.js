const Blog = require('../models/Blogs');
class HomeController {


    home(req, res){
        res.render('home');
    }


    about(req, res){
        res.render('about');
    }


    contact(req, res){
        res.render('contact');
    }


    search(req, res){

        console.log(
            "Từ khóa tìm kiếm:",
            req.query.q
        );

        res.render('search');
    }


    create(req, res){
        res.render('create');
    }


    index(req, res, next) {
        // Dùng Model Blog để tìm kiếm toàn bộ dữ liệu trong Collection
        Blog.find({})
            .then(blogs => {
                // Xuất mảng dữ liệu lấy được ra màn hình trình duyệt dưới định dạng JSON
                res.json(blogs);
            })
            .catch(error => {
                // Nếu có lỗi, chuyển đến middleware xử lý lỗi
                next(error);
            });
    }


    login(req, res){

        res.render('login');

    }


    checkLogin(req,res){

        const {
            username,
            password
        } = req.body;


        if(
            username === "admin" &&
            password === "123456"
        ){

            console.log(
                "Đăng nhập thành công"
            );

        }else{

            console.log(
                "Sai tài khoản hoặc mật khẩu"
            );

        }


        res.send(
            "Đã gửi dữ liệu."
        );

    }

}


module.exports = new HomeController();