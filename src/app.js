const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const moment = require('moment');
require('moment/locale/vi'); // Nạp tiếng Việt

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
                return moment(date).locale('vi').format(format);
            }
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const routes = require('./routes');
routes(app);

module.exports = app;
