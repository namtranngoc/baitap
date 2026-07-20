const express = require('express');
const morgan = require('morgan'); // Khai báo morgan
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// Tích hợp morgan vào app
app.use(morgan('combined'));
app.use(express.static('public'));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views'); 

// Middleware xử lý dữ liệu từ form HTML thông thường submit lên
app.use(express.urlencoded({
    extended: true
}));

// Middleware xử lý dữ liệu gửi lên dưới dạng JSON (dùng cho API, fetch, axios sau này)
app.use(express.json());
app.listen(port, () => {
app.get('/', (req, res) => {
    res.render('home');
});

// Route xử lý cho trang About
app.get('/about', (req, res) => {
    res.render('about');
});
// Route xử lý cho trang Liên hệ
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route hiển thị trang Tìm kiếm
app.get('/search', (req, res) => {
    res.render('search');
});
app.get('/search', (req, res) => {
    // req.query chứa toàn bộ các parameters trên URL
    console.log("Từ khóa tìm kiếm:", req.query.q);

    res.render('search');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});
// Route này dùng app.post thay vì app.get
app.post('/blogs/create', (req, res) => {
    // Toàn bộ dữ liệu ẩn nằm trong đối tượng req.body
    console.log("Dữ liệu nhận được từ Form:", req.body);

    // Tạm thời trả về data dưới dạng JSON lên màn hình trình duyệt
    res.json(req.body);
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "123456") {
        console.log("Đăng nhập thành công");
    } else {
        console.log("Sai tài khoản hoặc mật khẩu");
    }

    res.send("Đã gửi dữ liệu.");
});
  console.log(`Server đang chạy tại http://localhost:${port}`);
});