const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const db = require('./config/db')
const routes = require('./routes');

const app = express();


// Middleware
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));


// Handlebars
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Xử lý form
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


// Routes
app.use('/', routes);

db.connect()


module.exports = app;