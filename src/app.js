const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const moment = require('moment');

require('moment/locale/vi');
moment.locale('vi');

// Kết nối cơ sở dữ liệu
const db = require('./config/db');
db.connect();

const routes = require('./routes');

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(methodOverride('_method'));

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================
// HANDLEBARS
// =========================

app.engine(
    'hbs',
    engine({
        extname: '.hbs',

        helpers: {
            dateFormat: function (date, format) {
                if (!date) return '';

                return moment(date)
                    .locale('vi')
                    .format(format);
            }
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// =========================
// ROUTES
// =========================

routes(app);

// =========================
// EXPORT APP
// =========================

module.exports = app;