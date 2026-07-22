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


    store(req, res){

        console.log(
            "Dữ liệu nhận được:",
            req.body
        );

        res.json(req.body);
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