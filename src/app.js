const methodOverride = require('method-override');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const db = require('./config/db');
const routes = require('./routes');
const moment = require('moment');

const app = express();

app.use(methodOverride('_method'));
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            dateFormat: function (date, format) {
                return moment(date).format(format);
            }
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// Kết nối MongoDB trước khi xử lý request
app.use(async (req, res, next) => {
    try {
        await db.connect();
        next();
    } catch (error) {
        next(error);
    }
});

// Routes
routes(app);

module.exports = app;